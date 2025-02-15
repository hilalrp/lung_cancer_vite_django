import { useState } from "react";
import axios from "axios";

function Prediction() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Menampilkan preview gambar
      setPrediction(""); // Hapus hasil prediksi saat gambar baru diunggah
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(""); // Reset prediksi setiap kali submit ulang

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

      if (response.data && response.data.prediction) {
        setPrediction(response.data.prediction);
      } else {
        alert("Format respons tidak sesuai!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengunggah gambar! Periksa koneksi atau coba lagi.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Klasifikasi Kanker Paru-Paru</h1>
      <h2>Silakan upload citra histopatologi paru-paru</h2>
      
      <form onSubmit={handleSubmit}>
        <label className="custom-file-upload"  style={{ marginRight: "15px" }}>
          Unggah Gambar
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        </label>

        <button type="submit" className="predict-button" >
          Predict
        </button>
      </form>

      {imagePreview && (
        <div>
          <h2>Citra histopatologi yang diunggah:</h2>
          <img src={imagePreview} alt="Uploaded Preview" style={{ maxWidth: "300px", marginTop: "10px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} />
        </div>
      )}

      {prediction && (
        <h2 style={{ marginTop: "20px", color: "#333" }}>
          Hasil Prediksi: {prediction}
        </h2>
      )}
    </div>
  );
}

export default Prediction;
