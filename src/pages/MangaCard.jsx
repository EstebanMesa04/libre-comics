const getPortadaUrl = (manga) => {
  const coverRel = manga.relationships.find((rel) => rel.type === "cover_art");

  if (!coverRel || !coverRel.attributes) return "URL_DE_BACKUP_AQUI";

  const fileName = coverRel.attributes.fileName;
  const mangaId = manga.id;

  return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}.256.jpg`;
};

function MangaCard({ manga }) {
  const titulo =
    manga.attributes.title.en ||
    manga.attributes.title["ja-ro"] ||
    manga.attributes.title[Object.keys(manga.attributes.title)[0]] ||
    "Sin título";

  const portadaUrl = getPortadaUrl(manga);

  return (
    <div style={{ width: "200px", margin: "10px" }}>
      <img
        src={portadaUrl}
        alt={titulo}
        style={{
          width: "100%",
          borderRadius: "8px",
          aspectRatio: "2/3",
          objectFit: "cover",
        }}
      />
      <h3 style={{ fontSize: "1rem" }}>{titulo}</h3>
    </div>
  );
}

export default MangaCard;
