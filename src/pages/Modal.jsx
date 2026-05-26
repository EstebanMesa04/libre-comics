import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGeneralInfo } from "../context/GeneralInfoContext";
import { useFavoritos } from "../hooks/useFavoritos";
import "./Modal.css";

function Modal({ manga, alCerrar }) {
  const [capitulos, setCapitulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const {
    setMangaDatos,
    setNombreManga,
    setNumeroCapitulo,
    setNombreCapitulo,
  } = useGeneralInfo();
  const { toggleFavorito, esFavorito } = useFavoritos();

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
          <button
            className="modal-favorito"
            type="button"
            onClick={() => toggleFavorito(manga.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`corazon-icono ${esFavorito(manga.id) ? "corazon-icono-si" : "corazon-icono-no"}`}
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>
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
                <li
                  key={cap.id}
                  onClick={() => {
                    setMangaDatos(manga);
                    setNombreManga(titulo);
                    setNumeroCapitulo(cap.attributes.chapter);
                    setNombreCapitulo(cap.attributes.title);
                    alCerrar();
                  }}
                >
                  <Link
                    className="item-capitulo"
                    to={`/lector/${manga.id}/${cap.id}`}
                    replace={true}
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
