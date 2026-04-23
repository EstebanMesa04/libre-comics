import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      {/* barra de navegación superior */}
      <header>
        <Link to="/">Galeria</Link>
        <Link to="/favoritos">Favoritos</Link>
      </header>
      {/* Enrutamiento */}
      <Routes>
        <Route path="/" element={<h1>Galeria</h1>} />
        <Route path="/favoritos" element={<h1>Favoritos</h1>} />
      </Routes>
    </>
  );
}

export default App;
