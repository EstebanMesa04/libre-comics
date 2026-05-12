import "./VisorPagina.css";

function VisorPagina({ url }) {
  return (
    <div className="visorp-contenedor">
      <img className="visorp-img" src={url} />
    </div>
  );
}

export default VisorPagina;
