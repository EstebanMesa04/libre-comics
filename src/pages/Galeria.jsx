import { useState, useEffect } from "react";
import { useBuscarManga } from "../hooks/useBuscarManga";
import MangaCard from "./MangaCard";
import "./Galeria.css";
import { data } from "react-router-dom";

function Galeria() {
  const [query, setQuery] = useState("");
  const { data: mangas, loading } = useBuscarManga(query);

  /* const fetchDescription = async (comicId) => {
    try {
      const url = `https://archive.org/metadata/${comicId}`;
      const response = await fetch(url);
      const data = await response.json();

      const descriptionText =
        data.metadata?.description ||
        data.metadata?.notes ||
        "No hay descripción disponible para este cómic.";
      setDescription(descriptionText);
    } catch (error) {
      console.error("Error cargando descripción:", error);
      setDescription("No se pudo cargar la descripción del cómic.");
    }
  };

  const openModal = async (comic) => {
    setSelectedComic(comic);
    await fetchDescription(comic.id);
  };

  const closeModal = () => {
    setSelectedComic(null);
    setDescription("");
  }; */

  return (
    <>
      {console.log(mangas[0])}
      <div>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar manga..."
        />
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="comics-grid">
            {mangas.map((manga) => (
              <div
                key={manga.id}
                className="comic-card"
                onClick={() => openModal(manga)}
              >
                <MangaCard key={manga.id} manga={manga} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {/* {selectedComic && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <div className="modal-body">
              <img
                src={selectedComic.portada}
                alt={selectedComic.titulo}
                className="modal-image"
              />

              <div className="modal-info">
                <h2 className="modal-titulo">{selectedComic.titulo}</h2>

                <div className="modal-descripcion">
                  <h3>Descripción</h3>
                  <p>{description}</p>
                </div>

                <button
                  className="modal-leer-btn"
                  onClick={() => console.log("Leer cómic:", selectedComic.id)}
                >
                  Leer
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default Galeria;
