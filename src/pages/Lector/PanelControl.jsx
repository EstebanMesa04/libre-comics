import { useState } from "react";
import "./PanelControl.css";

function PanelControl({
  titulo,
  pgActual,
  setNav,
  estadoNav,
  setBarra,
  estadoBarra,
}) {
  return (
    <div className="panelc-contenedor">
      <h1 className="panelc-titulo">{titulo}</h1>
      <div className="panelc-cajon panelc-botones">
        <button>{"<-"}</button>
        <label>
          pg
          <select value={pgActual}>
            <option value={1}>{1}</option>
          </select>
        </label>
        <button>{"->"}</button>
      </div>
      <div className="panelc-herramientas-zoom">
        <h2>Herramientas de zoom</h2>
        <button type="button">ninguna</button>
        <button type="button">lupa</button>
        <button type="button">zoom general</button>
      </div>
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
    </div>
  );
}

export default PanelControl;
