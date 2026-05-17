import "./VisorPagina.css";

function VisorPagina({ url, navVisible, barraVisible, cargando, error }) {
  const acomodarAltura = () => {
    if (navVisible && barraVisible) {
      return "visorp-contenedor-b2";
    }

    if (!navVisible && barraVisible) {
      return "visorp-contenedor-b1";
    }

    if (navVisible && !barraVisible) {
      return "visorp-contenedor-b1";
    }

    if (!navVisible && !barraVisible) {
      return "visorp-contenedor-b0";
    }
  };
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
    <div className={`visorp-contenedor ${acomodarAltura()} `}>
      <img className="visorp-img" src={url} />
    </div>
  );
}

export default VisorPagina;
