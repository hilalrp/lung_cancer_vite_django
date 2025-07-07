function HistopathologyImage() {
  return (
    <div style={{ textAlign: "left", marginTop: "50px", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Citra Histopatologi</h1>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        Citra histopatologi adalah citra mikroskopis dari sampel jaringan yang memiliki peran penting
        dalam diagnosis medis dan penelitian. Citra ini memberikan informasi mendetail tentang tampilan
        dan struktur sel serta jaringan, memungkinkan ahli patologi untuk mengidentifikasi dan mengklasifikasikan
        penyakit dengan akurat.
      </p>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        Dalam dunia medis, analisis citra histopatologi digunakan untuk mendeteksi berbagai penyakit,
        seperti kanker, infeksi, dan gangguan jaringan lainnya. Teknologi berbasis kecerdasan buatan semakin
        banyak digunakan untuk membantu analisis otomatis dari citra histopatologi guna meningkatkan akurasi
        dan efisiensi diagnosis.
      </p>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img 
          src="/nor_40x_80.jpg" 
          alt="Histopathology Sample" 
          style={{ width: "30%", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }} 
        />
        <p style={{ fontSize: "16px", marginTop: "10px", fontStyle: "italic", color: "gray" }}>
          Contoh citra histopatologi
        </p>
      </div>
    </div>
  );
}

export default HistopathologyImage;
