import React, { createContext, useState, useContext } from "react";

const GeneralInfoContext = createContext();

export const GeneralInfoProvider = ({ children }) => {
  const [nombreManga, setNombreManga] = useState("");
  const [numeroCapitulo, setNumeroCapitulo] = useState("");
  const [nombreCapitulo, setNombreCapitulo] = useState("");

  const limpiarInfo = () => {
    setNombreManga("");
    setNumeroCapitulo("");
    setNombreCapitulo("");
  };

  return (
    <GeneralInfoContext.Provider
      value={{
        nombreManga,
        setNombreManga,
        numeroCapitulo,
        setNumeroCapitulo,
        nombreCapitulo,
        setNombreCapitulo,
        limpiarInfo,
      }}
    >
      {children}
    </GeneralInfoContext.Provider>
  );
};

export const useGeneralInfo = () => {
  const contexto = useContext(GeneralInfoContext);
  if (!contexto) {
    throw new Error(
      "useGeneralInfo debe ser usado dentro de un GeneralInfoProvider",
    );
  }
  return contexto;
};
