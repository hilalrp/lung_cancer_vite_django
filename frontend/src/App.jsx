import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Usage from "./pages/Usage";
import LungCancer from "./pages/LungCancer";
import About from "./pages/About";
import Prediction from "./pages/Prediction";
import HistopathologyImage from "./pages/HistopathologyImage";
import "./App.css"; // Tambahkan ini agar CSS bisa berfungsi

function App() {
  return (
    <Router>
      <div className="header">
        <h1>Lung Cancer Classification</h1>
        <nav className="navbar">
          <Link to="/">Home</Link> | 
          <Link to="/usage"> Cara Penggunaan</Link> |
          <Link to="/prediction"> Prediksi</Link> |
          <Link to="/lung-cancer"> Kanker Paru-Paru</Link> | 
          <Link to="/histopathology-image"> Citra Histopatologi</Link> |
          <Link to="/about"> Tentang Kami</Link> 
        </nav>
      </div>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usage" element={<Usage />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/lung-cancer" element={<LungCancer />} />
          <Route path="/histopathology-image" element={<HistopathologyImage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

     
      <div className="footer flex items-center h-16">
        <img src="/logoIPB.png" alt="Logo" className="logo mr-2" />
        <p> © 2025 Lung Cancer Classification - All Rights Reserved</p>
      </div>


    </Router>
  );
}

export default App;
