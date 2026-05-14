import { useState } from "react";
import { useBuscarManga } from "../hooks/useBuscarManga";
import MangaCard from "./MangaCard";
import Modal from "./Modal";
import "./Galeria.css";

function Galeria() {
  const [query, setQuery] = useState("");
  const { data: mangas, loading } = useBuscarManga(query);
  const [selectedManga, setSelectedManga] = useState(null);

  const openModal = (manga) => {
    setSelectedManga(manga);
  };

  const closeModal = () => {
    setSelectedManga(null);
  };

  return (
    <div className="galeria dark">
      <input
        type="text"
        className="search-input"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar manga..."
      />
      
      {loading ? (
        <p className="loading-message">Cargando mangas...</p>
      ) : (
        <div className="comics-grid">
          {mangas?.map((manga) => (
            <div
              key={manga.id}
              className="comic-card"
              onClick={() => openModal(manga)}
            >
              <MangaCard manga={manga} />
            </div>
          ))}
        </div>
      )}

      {selectedManga && (
        <Modal manga={selectedManga} alCerrar={closeModal} />
      )}
    </div>
  );
}

export default Galeria;