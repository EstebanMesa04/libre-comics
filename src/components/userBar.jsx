import { useAuth } from '../hooks/useAuth';
import './UserBar.css';

function UserBar() {
  const { usuario, logout, setMostrarAuth } = useAuth();

  if (!usuario) {
    return (
      <div className="user-bar">
        <button onClick={() => setMostrarAuth(true)}>
          Iniciar Sesion
        </button>
      </div>
    );
  }

  return (
    <div className="user-bar">
      <span>Hola, {usuario.nombre}</span>
      <button onClick={logout}>
        Cerrar Sesion
      </button>
    </div>
  );
}

export default UserBar;