import { useState } from "react";
import BarraEstado from "./BarraEstado";
import PanelControl from "./PanelControl";

import "./Lector.css";

function Lector() {
  const [mostrarPanel, setMostrarPanel] = useState(true);
  const [mostrarBarra, setMostrarBarra] = useState(true);

  return (
    <main className="lector-contenedor">
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
      <div className="visor-contenedor">
        Visor de paginas
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
      </div>
    </main>
  );
}

export default Lector;
