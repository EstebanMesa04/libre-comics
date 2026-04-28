import { Routes, Route, Link } from "react-router-dom";
import Galeria from "./pages/Galeria";
import Lector from "./pages/Lector/Lector";
import "./App.css";

function App() {
  return (
    <>
      {/* barra de navegación superior */}
      <header>
        LOGO | <Link to="/">Galeria</Link> |{" "}
        <Link to="/favoritos">Favoritos</Link> |{" "}
        <Link to="/lector">lector</Link>
      </header>
      {/* Enrutamiento */}
      <Routes>
        <Route path="/" element={<Galeria />} />
        <Route path="/favoritos" element={<h1>Favoritos</h1>} />
        <Route path="/lector" element={<Lector />} />
      </Routes>
    </>
  );
}

export default App;
