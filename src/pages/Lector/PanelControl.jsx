import "./PanelControl.css";

function PanelControl({ titulo, pgActual }) {
  return (
    <div className="panelc-contenedor">
      <h1 className="panelc-titulo">{titulo}</h1>
      <div className="panelc-cajon panelc-botones">
        <button>{"<-"}</button>
        <label>
          pg
          <select value={pgActual}>
            <option value={1}>{1}</option>
            <option value={2}>{2}</option>
            <option value={3}>{3}</option>
            <option value={4}>{4}</option>
            <option value={5}>{5}</option>
            <option value={6}>{6}</option>
            <option value={7}>{7}</option>
            <option value={8}>{8}</option>
            <option value={9}>{9}</option>
            <option value={10}>{10}</option>
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
          pantalla completa <input type="checkbox" />
        </label>
        <label>
          mostrar barra de estado <input type="checkbox" />
        </label>
      </div>
    </div>
  );
}

export default PanelControl;
