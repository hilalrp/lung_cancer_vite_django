import { useState } from "react";
import axios from "axios";

function Prediction() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [gradcamImage, setGradcamImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction("");
      setGradcamImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction("");
    setGradcamImage(null);

    if (!image) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        if (response.data.prediction) {
          setPrediction(response.data.prediction);
        }
        if (response.data.gradcam) {
          setGradcamImage(`data:image/png;base64,${response.data.gradcam}`);
        }
      } else {
        alert("Format respons dari server tidak sesuai.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      if (error.response) {
        // Server memberikan respon error (status 4xx/5xx)
        alert(
          `Server error ${error.response.status}: ${
            error.response.data?.error || "Terjadi kesalahan di server."
          }`
        );
      } else if (error.request) {
        // Permintaan terkirim tapi tidak ada respon
        alert("Gagal terhubung ke server. Silakan periksa koneksi internet Anda.");
      } else {
        // Error lainnya
        alert(`Terjadi kesalahan: ${error.message}`);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Klasifikasi Kanker Paru-Paru Berdasarkan Citra Histopatologi</h1>
      <h2>Silakan unggah citra histopatologi paru-paru, kemudian klik tombol Predict</h2>

      <form onSubmit={handleSubmit}>
        <label className="custom-file-upload" style={{ marginRight: "15px" }}>
          Unggah Gambar
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </label>

        <button type="submit" className="predict-button">
          Predict
        </button>
      </form>

      {imagePreview && (
        <div style={{ marginTop: "20px" }}>
          <h2>Citra histopatologi yang diunggah:</h2>
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{
              maxHeight: "250px",
              maxWidth: "250px",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      )}

      {prediction && (
        <h2 style={{ marginTop: "10px", color: "#333" }}>
          Hasil Prediksi: {prediction}
        </h2>
      )}

      {gradcamImage && (
        <div style={{ marginTop: "20px" }}>
          <h2>Grad-CAM (visualisasi aktivasi model):</h2>
          <img
            src={gradcamImage}
            alt="GradCAM"
            style={{
              maxHeight: "250px",
              maxWidth: "250px",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          />
          <p style={{ marginTop: "10px", color: "#555", fontStyle: "italic" }}>
            <strong>Warna merah</strong> menunjukkan area yang paling disorot oleh model dalam menentukan kelas.
          </p>
        </div>
      )}

    </div>
  );
}

export default Prediction;
