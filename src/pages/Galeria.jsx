import { useEffect, useState } from "react";

function Galeria() {
  /* aqui se hacen las pruevas de la api de the internet archive */
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      const query = "title:(comic) AND mediatype:(texts)";
      const url = `https://archive.org/advancedsearch.php?q=${query}&fl=identifier,title&rows=12&output=json`;

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

  if (loading) return <p>Cargando cómics...</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {comics.map((comic) => (
        <div
          key={comic.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <img
            src={comic.portada}
            alt={comic.titulo}
            style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <h3 style={{ fontSize: "14px", marginTop: "10px" }}>
            {comic.titulo}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default Galeria;
