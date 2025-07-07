function LungCancer() {
  return (
    <div style={{ textAlign: "left", marginTop: "50px", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Kanker Paru-Paru</h1>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        Pada sampel biopsi kecil atau sampel sitologi, jenis utama kanker paru-paru ditentukan oleh evaluasi 
        morfologis, yaitu adenocarcinoma dan squamous cell carcinoma (Zheng 2016). Identifikasi jenis histologis 
        karsinoma paru memiliki peran krusial dalam pengobatan yang dipersonalisasi karena setiap tipe tumor dapat 
        terkait dengan variasi genetik yang berbeda di dalamnya. 
      </p>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        Sistem grading diferensiasi adenokarsinoma mengikuti pedoman dari College of American Pathologists 
        (Moreira et al. 2020), yang membaginya menjadi tiga tingkat diferensiasi:
      </p>

      <h2>Adenocarcinoma</h2>
      <ul style={{ fontSize: "18px", lineHeight: "1.6" }}>
        <li>
          <strong>Well-differentiated adenocarcinoma (Diferensiasi Baik):</strong>
          <ul>
            <li>Tumor didominasi oleh pola lepidic.</li>
            <li>Tidak memiliki komponen high-grade atau kurang dari 20% fitur high-grade (seperti pola solid, micropapillary, atau glandular kompleks).</li>
          </ul>
        </li>
        <li>
          <strong>Moderately differentiated adenocarcinoma (Diferensiasi Sedang):</strong>
          <ul>
            <li>Tumor terutama menunjukkan pola acinar atau papillary.</li>
            <li>Memiliki kurang dari 20% fitur high-grade.</li>
          </ul>
        </li>
        <li>
          <strong>Poorly differentiated adenocarcinoma (Diferensiasi Buruk):</strong>
          <ul>
            <li>Tumor memiliki 20% atau lebih fitur high-grade.</li>
          </ul>
        </li>
      </ul>

      <h2>Squamous Cell Carcinoma</h2>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        Squamous Cell Carcinoma juga diklasifikasikan menjadi tiga tingkat diferensiasi. Grading ini berdasarkan 
        beberapa fitur, seperti kehadiran keratinisasi, jembatan antar sel (intercellular bridges), pleomorfisme 
        seluler, dan aktivitas mitosis (Weissferdt 2020).
      </p>

      <ul style={{ fontSize: "18px", lineHeight: "1.6" }}>
        <li>
          <strong>Well-differentiated squamous cell carcinoma (Diferensiasi Baik):</strong>
          <ul>
            <li>Menunjukkan keratinisasi, seperti keratin pearls dan intercellular bridges.</li>
            <li>Tumbuh dalam bentuk lembaran atau sarang sel, dengan sel poligonal yang memiliki nukleus bulat hingga oval, sitoplasma eosinofilik, dan fitur vesikular.</li>
            <li>Aktivitas mitosis serta area perdarahan atau nekrosis fokal mungkin ditemukan.</li>
          </ul>
        </li>
        <li>
          <strong>Moderately differentiated squamous cell carcinoma (Diferensiasi Sedang):</strong>
          <ul>
            <li>Menunjukkan atipia sitologi yang meningkat dan aktivitas mitosis yang lebih tinggi.</li>
            <li>Keratinisasi dan intercellular bridges masih ada, tetapi kurang menonjol dibandingkan dengan tumor berdiferensiasi baik.</li>
            <li>Area perdarahan atau nekrosis lebih umum ditemukan.</li>
          </ul>
        </li>
        <li>
          <strong>Poorly differentiated squamous cell carcinoma (Diferensiasi Buruk):</strong>
          <ul>
            <li>Tumbuh dalam bentuk lembaran tanpa struktur khas skuamosa, sehingga sering tidak dapat dikenali sebagai karsinoma skuamosa tanpa imunohistokimia.</li>
            <li>Menunjukkan pleomorfisme seluler yang signifikan, aktivitas mitosis yang tinggi, serta area nekrosis yang luas.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default LungCancer;
