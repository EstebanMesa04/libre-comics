import { useState, useEffect } from 'react';
import './Galeria.css';

function Galeria() {
  /* aqui se hacen las pruevas de la api de the internet archive */
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComic, setSelectedComic] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchComics = async () => {
      const query = "title:(comic) AND mediatype:(texts)";
      const url = `https://archive.org/advancedsearch.php?q=${query}&fl=identifier,title&rows=120&output=json`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const formattedData = data.response.docs.map((doc) => ({
          id: doc.identifier,
          titulo: doc.title,
          portada: `https://archive.org/services/img/${doc.identifier}`,
        }));

        setComics(formattedData);
      } catch (error) {
        console.error("Error cargando cómics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, []);

  const fetchDescription = async (comicId) => {
    try {
      const url = `https://archive.org/metadata/${comicId}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const descriptionText = data.metadata?.description || data.metadata?.notes || 'No hay descripción disponible para este cómic.';
      setDescription(descriptionText);
    } catch (error) {
      console.error("Error cargando descripción:", error);
      setDescription('No se pudo cargar la descripción del cómic.');
    }
  };

  const openModal = async (comic) => {
    setSelectedComic(comic);
    await fetchDescription(comic.id);
  };

  const closeModal = () => {
    setSelectedComic(null);
    setDescription('');
  };

  if (loading) return <p>Cargando cómics...</p>;

  return (
    <>
      <div className="comics-grid">
        {comics.map((comic) => (
          <div 
            key={comic.id} 
            className="comic-card"
            onClick={() => openModal(comic)}
          >
            <div className="comic-image-wrapper">
              <img
                src={comic.portada}
                alt={comic.titulo}
                className="comic-image"
              />
            </div>
            <div className="comic-info">
              <h3 className="comic-titulo">{comic.titulo}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedComic && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
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
                  onClick={() => console.log('Leer cómic:', selectedComic.id)}
                >
                  Leer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Galeria;