import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
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
              <Galeria />
            </AuthGuard>
          }
        />
        <Route
          path="/favoritos"
          element={
            <AuthGuard>
              <h1>Favoritos</h1>
            </AuthGuard>
          }
        />
        {/* <Route path="/lector/:id" element={<Lector />} /> */}
        <Route
          path="/lector"
          element={
            <AuthGuard>
              <Lector />
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
