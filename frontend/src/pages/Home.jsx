function Home() {
    return (
      <div style={{ textAlign: "left", marginTop: "50px" }}>
        <h1>Selamat Datang di Website Klasifikasi Kanker Paru-Paru</h1>
        <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        Website ini bertujuan untuk menyediakan informasi dan solusi berbasis kecerdasan buatan (AI) dalam deteksi dini kanker paru-paru. 
        </p>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        Kami mengembangkan model deep learning yang mampu menganalisis data medis, seperti hasil biopsi dan pencitraan paru-paru, untuk membantu tenaga medis dalam 
        mengidentifikasi jenis dan tingkat diferensiasi kanker paru-paru. Model ini didasarkan pada penelitian terkini di bidang histopatologi dan deep learning, 
        sehingga dapat memberikan prediksi yang akurat dan mendukung pengambilan keputusan medis.
      </p>
      <h2 style={{ marginTop: "30px", textAlign: "center" }}>Fitur Utama</h2>
      <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
        <li><strong>Kanker Paru-Paru</strong> – Penjelasan lengkap mengenai adenocarcinoma dan squamous cell carcinoma serta sistem gradingnya.</li>
        <li><strong>Prediksi</strong> – Teknologi AI yang dapat membantu deteksi dini kanker paru-paru berdasarkan data histologis dan pencitraan.</li>
        <li><strong>Citra Histopatologi</strong> – Penjelasan lengkap mengenai citra histopatologi.</li>
      </ul>
      </div>
    );
  }
  
  export default Home;
  