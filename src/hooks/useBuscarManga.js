import { useState, useEffect } from "react";

const MANGADEX_API = "https://api.mangadex.org";

export const useBuscarManga = (searchTerm = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMangas = async () => {
      setLoading(true);
      try {
        // Parámetros por defecto para "Contenido inicial" o "Búsqueda"
        const params = new URLSearchParams();

        params.append("limit", "20");

        const includes = ["cover_art", "author", "artist"];
        includes.forEach((value) => {
          params.append("includes[]", value);
        });

        const ratings = ["safe", "suggestive"];
        ratings.forEach((value) => {
          params.append("contentRating[]", value);
        });

        // Si hay término, se añade; si no, la API devuelve los más recientes/populares
        if (searchTerm.trim()) {
          params.append("title", searchTerm);
        }

        const response = await fetch(
          `${MANGADEX_API}/manga?${params.toString()}`,
          {
            signal: abortController.signal,
          },
        );

        if (!response.ok) throw new Error("Error al consultar MangaDex");

        const json = await response.json();
        setData(json.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();

    return () => abortController.abort();
  }, [searchTerm]);

  return { data, loading, error };
};
