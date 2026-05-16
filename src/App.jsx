import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import { GeneralInfoProvider } from "./context/GeneralInfoContext.jsx";
import UserBar from "./components/UserBar.jsx";
import Galeria from "./pages/Galeria.jsx";
import Lector from "./pages/Lector/Lector.jsx";
import Navbar from "./components/Navbar";
import "./App.css";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* barra de navegación superior, se oculta en el modo lectura */}
      {location.pathname.includes("lector") ? null : <Navbar />}

      {/* Enrutamiento */}
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <GeneralInfoProvider>
                <Galeria />
              </GeneralInfoProvider>
            </AuthGuard>
          }
        />
        <Route
          path="/favoritos"
          element={
            <AuthGuard>
              <GeneralInfoProvider>
                <h1>Favoritos</h1>
              </GeneralInfoProvider>
            </AuthGuard>
          }
        />
        <Route
          path="/lector/:capitulo"
          element={
            <AuthGuard>
              <GeneralInfoProvider>
                <Lector />
              </GeneralInfoProvider>
            </AuthGuard>
          }
        />
        <Route path="*" element={<h1>404: Not found</h1>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
