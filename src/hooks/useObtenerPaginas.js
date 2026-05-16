import { useState, useEffect } from "react";

const MANGADEX_API = "https://api.mangadex.org";

export const useObtenerPaginas = (idCapitulo) => {
  const [paginas, setPaginas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idCapitulo) return;

    const controladorAbortar = new AbortController();

    const consultarServidor = async () => {
      setCargando(true);
      setError(null);

      try {
        // 1. Solicitar el servidor At-Home para el capítulo
        const respuesta = await fetch(
          `${MANGADEX_API}/at-home/server/${idCapitulo}`,
          {
            signal: controladorAbortar.signal,
          },
        );

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el servidor de imágenes");
        }

        const datos = await respuesta.json();

        // 2. Extraer los datos necesarios para la estructura de la URL
        const urlBase = datos.baseUrl;
        const hash = datos.chapter.hash;
        const archivosPaginas = datos.chapter.data; // Array con nombres de archivos (calidad original)

        // 3. Construir el array de URLs finales
        // Estructura oficial: {baseUrl}/data/{hash}/{filename}
        const urlsConstruidas = archivosPaginas.map(
          (archivo) => `${urlBase}/data/${hash}/${archivo}`,
        );

        setPaginas(urlsConstruidas);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setCargando(false);
      }
    };

    consultarServidor();

    return () => controladorAbortar.abort();
  }, [idCapitulo]);

  return { paginas, cargando, error };
};
