import torch
import torch.nn as nn
import numpy as np
import cv2
from PIL import Image
from torchvision import models, transforms

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

# Preprocessing
def normalize_image(image):
    return image.astype(np.float32) / 255.0

def apply_clahe(image):
    lab = cv2.cvtColor(image, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    l = clahe.apply(l)
    lab = cv2.merge((l, a, b))
    return cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)

# Transformasi gambar
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

# Fungsi prediksi
def predict(image):
    image = normalize_image(apply_clahe(image))
    image = Image.fromarray((image * 255).astype(np.uint8))  # Konversi ke PIL
    input_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(input_tensor)
        prediction = torch.argmax(output, dim=1).item()

    return LABELS.get(prediction, "Unknown")
