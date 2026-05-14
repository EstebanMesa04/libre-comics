import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/AuthGuard";
import UserBar from "./components/UserBar";
import Galeria from "./pages/Galeria";
import Lector from "./pages/Lector/Lector";
import Navbar from "./components/Navbar";
import "./App.css";

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      {/* Barra de usuario (autenticación) */}
      <UserBar />
      
      {/* barra de navegación superior, se oculta en el modo lectura */}
      {location.pathname.includes("lector") ? null : <Navbar />}
      
      {/* Enrutamiento */}
      <Routes>
        <Route path="/" element={
          <AuthGuard>
            <Galeria />
          </AuthGuard>
        } />
        <Route path="/favoritos" element={
          <AuthGuard>
            <h1>Favoritos</h1>
          </AuthGuard>
        } />
        {/* <Route path="/lector/:id" element={<Lector />} /> */}
        <Route path="/lector" element={
          <AuthGuard>
            <Lector />
          </AuthGuard>
        } />
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