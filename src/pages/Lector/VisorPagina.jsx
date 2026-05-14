import "./VisorPagina.css";

function VisorPagina({ url, navVisible, barraVisible }) {
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

  return (
    <div className={`visorp-contenedor ${acomodarAltura()} `}>
      <img className="visorp-img" src={url} />
    </div>
  );
}

export default VisorPagina;
