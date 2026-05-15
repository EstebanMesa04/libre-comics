import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./AuthModal.css";

function AuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, cargando, error, setMostrarAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={() => setMostrarAuth(false)}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="auth-close-btn"
          onClick={() => setMostrarAuth(false)}
        >
          ✕
        </button>
        <h2>Iniciar Sesion</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <div className="auth-demo-users">
          <p>
            <strong>Acceso:</strong>
          </p>
          <p>Usuario: admin</p>
          <p>Contraseña: 123456</p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
