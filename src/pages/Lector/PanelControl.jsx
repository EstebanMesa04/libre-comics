import { useState } from "react";
import { useGeneralInfo } from "../../context/GeneralInfoContext.jsx";
import Modal from "../Modal.jsx";
import "./PanelControl.css";

function PanelControl({
  pgActual,
  setPgActual,
  pgTotal,
  pgSig,
  pgAnt,

  setNav,
  estadoNav,
  setBarra,
  estadoBarra,
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const { mangaDatos, nombreManga } = useGeneralInfo();

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className="panelc-contenedor">
      <h1 className="panelc-titulo">{nombreManga}</h1>
      <div className="panelc-cajon">
        <button
          className="panelc-botones"
          onClick={() => {
            pgAnt();
          }}
        >
          <img src="../../src/assets/arrow_back.png" alt="" />
        </button>
        <select
          className="panelc-botones"
          value={pgActual}
          onChange={(e) => setPgActual(Number(e.target.value))}
        >
          {Array.from({ length: pgTotal }, (_, indice) => (
            <option key={indice + 1} value={indice}>
              {indice + 1}
            </option>
          ))}
        </select>
        <button
          className="panelc-botones"
          onClick={() => {
            pgSig();
          }}
        >
          <img src="../../src/assets/arrow_forward.png" alt="" />
        </button>
        <button
          className="panelc-botones panelc-bt-cap"
          onClick={abrirModal}
          type="button"
        >
          Capítulos
        </button>
      </div>

      {/* <div className="panelc-herramientas-zoom">
        <h2>Herramientas de zoom</h2>
        <button type="button">ninguna</button>
        <button type="button">lupa</button>
        <button type="button">zoom general</button>
      </div>
       */}

      <div className="panelc-opciones">
        <h2>Opciones de lectura</h2>
        <label>
          mostrar barra de navegación{" "}
          <input
            type="checkbox"
            checked={estadoNav}
            onChange={(e) => {
              setNav(e.target.checked);
            }}
          />
        </label>
        <label>
          mostrar barra de estado{" "}
          <input
            type="checkbox"
            checked={estadoBarra}
            onChange={(e) => {
              setBarra(e.target.checked);
            }}
          />
        </label>
      </div>
      {mostrarModal ? <Modal manga={mangaDatos} alCerrar={cerrarModal} /> : ""}
    </div>
  );
}

export default PanelControl;
