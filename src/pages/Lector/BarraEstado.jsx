import "./BarraEstado.css";

function BarraEstado({ titulo, pgActual, pgTotal }) {
  return (
    <div className="bar-contenedor">
      panel
      <span>{titulo}</span>
      <samp>
        pg.{pgActual}/{pgTotal}
      </samp>
      pan_com
    </div>
  );
}

export default BarraEstado;
