import { Routes, Route, Link, useLocation } from "react-router-dom";
import Galeria from "./pages/Galeria";
import Lector from "./pages/Lector/Lector";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      {/* barra de navegación superior */}
      {useLocation().pathname.includes("lector") ? null : <Navbar />}
      {/* Enrutamiento */}
      <Routes>
        <Route path="/" element={<Galeria />} />
        <Route path="/favoritos" element={<h1>Favoritos</h1>} />
        {/* <Route path="/lector/:id" element={<Lector />} /> */}
        <Route path="/lector" element={<Lector />} />
        <Route path="*" element={<h1>404: Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
