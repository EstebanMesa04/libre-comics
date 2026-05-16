import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useObtenerPaginas } from "../../hooks/useObtenerPaginas";
import BarraEstado from "./BarraEstado";
import PanelControl from "./PanelControl";
import VisorPagina from "./VisorPagina";
import Navbar from "../../components/Navbar";

import "./Lector.css";

function Lector() {
  const [mostrarPanel, setMostrarPanel] = useState(true);
  const [mostrarBarra, setMostrarBarra] = useState(true);
  const [mostrarNav, setMostrarNav] = useState(true);
  const [paginaActual, setPaginaActual] = useState(0);

  const idsUrls = useParams();
  const { paginas, cargando, error } = useObtenerPaginas(idsUrls.capitulo);

  // precargador de paginas
  useEffect(() => {
    if (paginas.length === 0) return;

    const paginasParaPrecargar = [
      paginaActual - 2,
      paginaActual - 1,
      paginaActual + 1,
      paginaActual + 2,
    ];

    paginasParaPrecargar.forEach((i) => {
      if (i < paginas.length) {
        const imagenEnMemoria = new Image();
        imagenEnMemoria.src = paginas[i];
      }
    });
  }, [paginaActual, paginas]);

  const paginaSiguiente = () => {
    if (paginaActual + 1 < paginas.length) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
    }
  };

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
          pgActual={paginaActual}
          setPgActual={setPaginaActual}
          pgTotal={paginas.length}
          pgSig={paginaSiguiente}
          pgAnt={paginaAnterior}
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
          pgActual={paginaActual + 1}
          pgTotal={paginas.length}
          setPanel={setMostrarPanel}
          estadoPanel={mostrarPanel}
        />
      </div>
      <VisorPagina
        className="visor-contenedor"
        url={paginas[paginaActual]}
        navVisible={mostrarNav}
        barraVisible={mostrarBarra}
        cargando={cargando}
        error={error}
      />
    </main>
  );
}

export default Lector;
