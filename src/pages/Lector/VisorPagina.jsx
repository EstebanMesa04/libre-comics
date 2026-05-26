import { useState } from "react";
import "./VisorPagina.css";

function VisorPagina({ url, cargando, error }) {
  const [mouseAdentro, setMouseAdentro] = useState(false);
  const [mousePosX, setMousePosX] = useState(0);
  const [mousePosy, setMousePosy] = useState(0);

  return (
    <div className="visorp-contenedor">
      {cargando && (
        <p className="visorp-mensajes">Cargando páginas del capítulo...</p>
      )}
      {error && <p className="visorp-mensajes">Error: {error}</p>}

      <img className="visorp-img" src={url} />
    </div>
  );
}

export default VisorPagina;
