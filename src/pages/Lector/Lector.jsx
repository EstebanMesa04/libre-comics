import { useState } from "react";
import BarraEstado from "./BarraEstado";
import PanelControl from "./PanelControl";
import VisorPagina from "./VisorPagina";
import Navbar from "../../components/Navbar";

import "./Lector.css";

function Lector() {
  const [mostrarPanel, setMostrarPanel] = useState(true);
  const [mostrarBarra, setMostrarBarra] = useState(true);

  return (
    <main className="lector-contenedor">
      <div className={`navbar-contenedor`}>
        <button
          onClick={() => {
            setMostrarPanel(!mostrarPanel);
          }}
          type="button"
        >
          panel de control
        </button>

        <button
          onClick={() => {
            setMostrarBarra(!mostrarBarra);
          }}
          type="button"
        >
          barra de estado
        </button>
        <Navbar />
      </div>
      <div
        className={`panel-control-contenedor  ${mostrarPanel ? "" : "panel-control-ocultar"}`}
      >
        <PanelControl
          titulo={"Titulo de ejemplo en la Barra de estado"}
          pgActual={5}
        />
      </div>
      <div
        className={`barra-estado-contenedor ${mostrarBarra ? "" : "barra-estado-ocultar"}`}
      >
        <BarraEstado
          titulo={"Titulo de ejemplo en la Barra de estado"}
          pgActual={5}
          pgTotal={15}
        />
      </div>
      <VisorPagina
        className="visor-contenedor"
        url={
          "https://images.pexels.com/photos/36421534/pexels-photo-36421534.jpeg"
        }
      />
    </main>
  );
}

export default Lector;
