import { useState, useEffect } from "react";

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem("mangas_favoritos");
    return guardados ? JSON.parse(guardados) : [];
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("mangas_favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Alternar favorito (Agregar/Eliminar)
  const toggleFavorito = (idManga) => {
    setFavoritos((prev) =>
      prev.includes(idManga)
        ? prev.filter((id) => id !== idManga)
        : [...prev, idManga],
    );
  };

  const esFavorito = (idManga) => favoritos.includes(idManga);

  return { favoritos, toggleFavorito, esFavorito };
};
