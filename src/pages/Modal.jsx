import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Modal.css";

function Modal({ manga, alCerrar }) {
  const [capitulos, setCapitulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Extraer datos básicos
  const titulo =
    manga.attributes.title.en ||
    manga.attributes.title["ja-ro"] ||
    manga.attributes.title[Object.keys(manga.attributes.title)[0]] ||
    "Sin título";

  const descripcion =
    manga.attributes.description.es ||
    manga.attributes.description.en ||
    manga.attributes.description[
      Object.keys(manga.attributes.description)[0]
    ] ||
    "Sin descripción disponible.";

  const portadaInfo = manga.relationships.find(
    (rel) => rel.type === "cover_art",
  );

  const urlPortada = `https://uploads.mangadex.org/covers/${manga.id}/${portadaInfo?.attributes?.fileName}.512.jpg`;

  useEffect(() => {
    const obtenerCapitulos = async () => {
      try {
        const respuesta = await fetch(
          `https://api.mangadex.org/manga/${manga.id}/feed?translatedLanguage[]=es-la&limit=500&order[chapter]=asc`,
        );
        const datos = await respuesta.json();
        setCapitulos(datos.data);
      } catch (error) {
        console.error("Error cargando capítulos", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCapitulos();
  }, [manga.id]);

  return (
    <div
      className="modal-fondo"
      onClick={alCerrar}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-contenedor" onClick={(e) => e.stopPropagation()}>
        <button className="boton-cerrar" onClick={alCerrar}>
          ×
        </button>

        <div className="modal-cabecera">
          <img src={urlPortada} alt={titulo} className="modal-portada" />
          <div className="modal-info-basica">
            <h2>{titulo}</h2>
            <p className="modal-descripcion">{descripcion}</p>
          </div>
        </div>

        <div className="modal-cuerpo">
          <h3>Capítulos Disponibles</h3>
          {cargando ? (
            <p>Cargando capítulos...</p>
          ) : (
            <ul className="lista-capitulos">
              {capitulos.map((cap) => (
                <li key={cap.id}>
                  <Link
                    className="item-capitulo"
                    to={`lector/${manga.id}/${cap.id}`}
                  >
                    Capítulo {cap.attributes.chapter}
                    {cap.attributes.title ? ` - ${cap.attributes.title}` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
