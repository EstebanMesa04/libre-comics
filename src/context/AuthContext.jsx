import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USUARIO_DEFECTO = {
  email: 'admin',
  password: '123456',
  nombre: 'Administrador'
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarAuth, setMostrarAuth] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    const sessionGuarda = localStorage.getItem('usuario_actual');
    if (sessionGuarda) {
      setUsuario(JSON.parse(sessionGuarda));
    }
  }, 0);
  
  return () => clearTimeout(timer);
}, []);

  const login = async (email, password) => {
    setCargando(true);
    setError(null);
    
    // Simular tiempo de carga
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === USUARIO_DEFECTO.email && password === USUARIO_DEFECTO.password) {
      const usuarioLogueado = { 
        nombre: USUARIO_DEFECTO.nombre, 
        email: USUARIO_DEFECTO.email 
      };
      setUsuario(usuarioLogueado);
      localStorage.setItem('usuario_actual', JSON.stringify(usuarioLogueado));
      setCargando(false);
      setMostrarAuth(false);
      return true;
    } else {
      setError('Usuario o contraseña incorrectos');
      setCargando(false);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario_actual');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      cargando,
      error,
      login,
      logout,
      mostrarAuth,
      setMostrarAuth,
      isAuthenticated: !!usuario
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;