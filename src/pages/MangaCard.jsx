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
    <div>
      <img src={portadaUrl} alt={titulo} />
      <h3>{titulo}</h3>
    </div>
  );
}

export default MangaCard;
