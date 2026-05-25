import "./VisorPagina.css";

function VisorPagina({ url, navVisible, barraVisible, cargando, error }) {
  if (cargando)
    return (
      <div className="visorp-contenedor">
        {<p className="visorp-mensajes">Cargando páginas del capítulo...</p>}
      </div>
    );
  if (error) {
    return (
      <div className="visorp-contenedor">
        <p className="visorp-mensajes">Error: {error}</p>
      </div>
    );
  }
  return (
    <div className="visorp-contenedor">
      <img className="visorp-img" src={url} />
    </div>
  );
}

export default VisorPagina;
