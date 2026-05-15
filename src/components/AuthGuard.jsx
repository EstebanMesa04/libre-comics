import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import './AuthGuard.css';

function AuthGuard({ children }) {
  const { isAuthenticated, mostrarAuth, setMostrarAuth } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <div className="auth-guard-wall">
          <div className="auth-guard-content">
            <h1>Libreria de Manga</h1>
            <p>Inicia sesion para acceder a esta pagina</p>
            <button onClick={() => setMostrarAuth(true)}>
              Iniciar Sesion
            </button>
          </div>
        </div>
        {mostrarAuth && <AuthModal />}
      </>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;