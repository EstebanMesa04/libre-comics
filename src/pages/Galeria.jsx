import { useState, useEffect } from "react";
import { useBuscarManga } from "../hooks/useBuscarManga";
import MangaCard from "./MangaCard";
import Modal from "./Modal";
import "./Galeria.css";
import { data } from "react-router-dom";

function Galeria() {
  const [query, setQuery] = useState("");
  const { data: mangas, loading } = useBuscarManga(query);
  const [selectedManga, setSelectedManga] = useState(null);

  const openModal = async (manga) => {
    setSelectedManga(manga);
  };

  const closeModal = () => {
    setSelectedManga(null);
  };

  return (
    <>
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
      {selectedManga && <Modal manga={selectedManga} alCerrar={closeModal} />}
    </>
  );
}

export default Galeria;
