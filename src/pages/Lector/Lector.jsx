import { useState } from "react";
import BarraEstado from "./BarraEstado";
import PanelControl from "./PanelControl";
import VisorPagina from "./VisorPagina";
import Navbar from "../../components/Navbar";

import "./Lector.css";

function Lector() {
  const [mostrarPanel, setMostrarPanel] = useState(true);
  const [mostrarBarra, setMostrarBarra] = useState(true);
  const [mostrarNav, setMostrarNav] = useState(true);

  return (
    <main
      className={`lector-contenedor ${mostrarPanel ? "" : "lector-contenedor-panel-oculto"}`}
    >
      <div
        className={`navbar-contenedor ${mostrarNav ? "" : "navbar-contenedor-ocultar"}`}
      >
        <Navbar />
      </div>
      <div
        className={`panel-control-contenedor  ${mostrarPanel ? "" : "panel-control-ocultar"}`}
      >
        <PanelControl
          titulo={"Titulo de ejemplo en la Barra de estado"}
          pgActual={5}
          setNav={setMostrarNav}
          estadoNav={mostrarNav}
          setBarra={setMostrarBarra}
          estadoBarra={mostrarBarra}
        />
      </div>
      <div
        className={`barra-estado-contenedor ${mostrarBarra ? "" : "barra-estado-ocultar"}`}
      >
        <BarraEstado
          titulo={"Titulo de ejemplo en la Barra de estado"}
          pgActual={5}
          pgTotal={15}
          setPanel={setMostrarPanel}
          estadoPanel={mostrarPanel}
        />
      </div>
      <VisorPagina
        className="visor-contenedor"
        url={
          "https://images.pexels.com/photos/36421534/pexels-photo-36421534.jpeg"
        }
        navVisible={mostrarNav}
        barraVisible={mostrarBarra}
      />
    </main>
  );
}

export default Lector;
