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

  const acomodarGrilla = () => {
    if (!mostrarPanel && !mostrarBarra && !mostrarNav) {
      return "lc-todo-oculto";
    }
    if (!mostrarNav && !mostrarBarra) {
      return "lc-nav-y-barra-oculto";
    }
    if (!mostrarPanel && !mostrarBarra) {
      return "lc-panel-y-barra-oculto";
    }
    if (!mostrarPanel && !mostrarNav) {
      return "lc-panel-y-nav-oculto ";
    }
    if (!mostrarBarra) {
      return "lc-barra-oculto ";
    }
    if (!mostrarNav) {
      return "lc-nav-oculto";
    }
    if (!mostrarPanel) {
      return "lc-panel-oculto";
    }
  };

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
      setPaginaActual((prev) => prev + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 0) {
      setPaginaActual((prev) => prev - 1);
    }
  };

  // Shortcuts
  useEffect(() => {
    if (paginas.length === 0) return;

    const manejarTeclado = (evento) => {
      // Evitar disparar acciones si el usuario está escribiendo en algún buscador o input
      if (
        evento.target.tagName === "INPUT" ||
        evento.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      //console.log(evento.key);

      // Evaluar la tecla presionada
      if (
        evento.key === "ArrowRight" ||
        evento.key === "d" ||
        evento.key === "D"
      ) {
        paginaSiguiente();
      }

      if (
        evento.key === "ArrowLeft" ||
        evento.key === "a" ||
        evento.key === "A"
      ) {
        paginaAnterior();
      }
      // Ocultar o mostrar todo
      if (evento.key === "f" || evento.key === "F") {
        if (mostrarBarra || mostrarNav || mostrarPanel) {
          setMostrarBarra(false);
          setMostrarNav(false);
          setMostrarPanel(false);
        }
        if (!mostrarBarra && !mostrarNav && !mostrarPanel) {
          setMostrarBarra(true);
          setMostrarNav(true);
          setMostrarPanel(true);
        }
      }
      // Ocultar nav
      if (evento.key === "n" || evento.key === "N") {
        setMostrarNav(!mostrarNav);
      }
      // Ocultar barra de estado
      if (evento.key === "b" || evento.key === "B") {
        setMostrarBarra(!mostrarBarra);
      }
      // Ocultar panel de control
      if (evento.key === "v" || evento.key === "V") {
        setMostrarPanel(!mostrarPanel);
      }
    };

    window.addEventListener("keydown", manejarTeclado);

    return () => {
      window.removeEventListener("keydown", manejarTeclado);
    };
  }, [paginas.length, paginaSiguiente, paginaAnterior]);

  return (
    <main className={`lector-contenedor ${acomodarGrilla()}`}>
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
