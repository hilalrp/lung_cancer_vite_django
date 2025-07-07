import torch
import torch.nn as nn
import numpy as np
import cv2
from PIL import Image
from torchvision import models, transforms
from io import BytesIO
import base64

# Label kelas
LABELS = {0: "Adenocarcinoma", 1: "Normal", 2: "Squamous Cell Carcinoma"}

# Load model
model = models.densenet121(weights=models.DenseNet121_Weights.DEFAULT)
num_ftrs = model.classifier.in_features
model.classifier = nn.Sequential(
    nn.Linear(num_ftrs, 512),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(512, len(LABELS))
)
model.load_state_dict(torch.load("api/best_model_LungHist700DenseNet121_CLAHE_lr1e-05_bs16_fr0.25.pth", map_location=torch.device("cpu")))
model.eval()

# Preprocessing utilitas
def normalize_image(image):
    """Normalisasi piksel ke rentang 0-1."""
    return image.astype(np.float32) / 255.0

def apply_clahe(image):
    """Terapkan CLAHE pada channel L (Lightness) dalam ruang warna LAB."""
    lab = cv2.cvtColor(image, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l = clahe.apply(l)
    lab = cv2.merge((l, a, b))
    return cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)

# Transformasi gambar ke tensor
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

def generate_gradcam(model, input_tensor, class_idx, original_image):
    activations = []
    gradients = []

    def forward_hook(module, input, output):
        activations.append(output)

    def backward_hook(module, grad_input, grad_output):
        gradients.append(grad_output[0])

    # Hook di layer terakhir CNN
    final_conv = model.features[-1]
    fwd = final_conv.register_forward_hook(forward_hook)
    bwd = final_conv.register_backward_hook(backward_hook)

    model.zero_grad()
    output = model(input_tensor)
    class_score = output[:, class_idx]
    class_score.backward()

    # Grad-CAM computation
    grads_val = gradients[0].squeeze(0).detach().cpu().numpy()
    fmap = activations[0].squeeze(0).detach().cpu().numpy()
    weights = np.mean(grads_val, axis=(1, 2))
    cam = np.zeros(fmap.shape[1:], dtype=np.float32)

    for i, w in enumerate(weights):
        cam += w * fmap[i, :, :]

    cam = np.maximum(cam, 0)
    cam = (cam - np.min(cam)) / (np.max(cam) - np.min(cam) + 1e-8)
    cam = cv2.resize(cam, (224, 224))
    heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)

    # Resize original image & normalize
    orig = cv2.resize(original_image, (224, 224))
    if orig.max() <= 1.0:
        orig = (orig * 255).astype(np.uint8)

    # Convert RGB -> BGR (karena OpenCV pakai BGR)
    orig_bgr = cv2.cvtColor(orig, cv2.COLOR_RGB2BGR)

    # Overlay Grad-CAM dengan gambar asli (dengan alpha blending)
    overlay = cv2.addWeighted(orig_bgr, 0.5, heatmap, 0.5, 0)

    # Convert to base64
    overlay_rgb = cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(overlay_rgb)
    buffer = BytesIO()
    pil_image.save(buffer, format="PNG")
    encoded_string = base64.b64encode(buffer.getvalue()).decode()

    fwd.remove()
    bwd.remove()

    return encoded_string


def predict(image):
    # Preprocess
    image_clahe = normalize_image(apply_clahe(image))
    image_pil = Image.fromarray((image_clahe * 255).astype(np.uint8))
    input_tensor = transform(image_pil).unsqueeze(0)

    with torch.no_grad():
        output = model(input_tensor)
        class_idx = torch.argmax(output, dim=1).item()

    gradcam_base64 = generate_gradcam(model, input_tensor, class_idx, image)
    label = LABELS.get(class_idx, "Unknown")

    return label, gradcam_base64

