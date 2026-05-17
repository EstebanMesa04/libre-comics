import React, { useState, useEffect } from "react";
import { useFavoritos } from "../hooks/useFavoritos.js";
import MangaCard from "./MangaCard.jsx";
import Modal from "./Modal.jsx";
import "./Galeria.css";

const MANGADEX_API = "https://api.mangadex.org";

const Favoritos = () => {
  const { favoritos, toggleFavorito } = useFavoritos();
  const [mangasFavoritos, setMangasFavoritos] = useState([]);
  const [selectedManga, setSelectedManga] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const openModal = (manga) => {
    setSelectedManga(manga);
  };

  const closeModal = () => {
    setSelectedManga(null);
  };

  useEffect(() => {
    // Si no hay IDs guardados en favoritos, evitamos hacer la petición
    if (favoritos.length === 0) {
      setMangasFavoritos([]);
      return;
    }

    const obtenerMangasFavoritos = async () => {
      setCargando(true);
      setError(null);

      try {
        // Construimos los parámetros de la URL: ?ids[]=id1&ids[]=id2...
        const queryParams = favoritos.map((id) => `ids[]=${id}`).join("&");

        const respuesta = await fetch(
          `${MANGADEX_API}/manga?${queryParams}&includes[]=cover_art`,
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar tus mangas favoritos");
        }

        const datos = await respuesta.json();
        setMangasFavoritos(datos.data); // Guarda el array de objetos manga
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerMangasFavoritos();
  }, [favoritos]); // Se vuelve a ejecutar si el usuario elimina un ID desde aquí

  return (
    <>
      {console.log(mangasFavoritos[0])}
      <div className="galeria dark">
        {cargando ? (
          <p className="loading-message">Cargando tus favoritos...</p>
        ) : favoritos.length === 0 ? (
          <p className="loading-message">
            No tienes mangas agregados a favoritos todavía.
          </p>
        ) : (
          <div className="comics-grid">
            {mangasFavoritos.map((manga) => (
              <div
                key={manga.id}
                className="comic-card"
                onClick={() => openModal(manga)}
              >
                <MangaCard manga={manga} />
                <button
                  style={{
                    backgroundColor: "#da5a65",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    toggleFavorito(manga.id);
                    e.stopPropagation();
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedManga && <Modal manga={selectedManga} alCerrar={closeModal} />}
      </div>
    </>
  );
};

export default Favoritos;
