import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';

//Importa las paginas de alumno y administrador
import HomePageAlumno from "./pages/HomePageAlumno/HomePageAlumno";
import HomePageAdmin from "./pages/HomePageAdmin/HomePageAdmin";
import LoginPage from './pages/LoginPage/LoginPage';


//Función principal
function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    // Llamar a la función get_user para obtener el nombre de usuario
    getUsername();
  }, []);

  const handleLogout = () => {
    // Eliminar la cookie "access-Token"
    document.cookie = "access-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redireccionar a la página de inicio de sesión
    window.location.href = "/";
  };

  const checkRolAndRedirect = async (role) => {
    if (role === 'alumno') {
      setRedirect('/alumno');
    } else if (role === 'admin') {
      setRedirect('/admin');
    } else {
      setRedirect('/');
    }
  };

  const getUsername = async () => {
    try {
      const response = await fetch('/omega/decode_user_token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.nombre);
        setRole(data.role);
        checkRolAndRedirect(data.role);
      } else {
        console.log('Error al obtener el nombre de usuario');
      }
    } catch (error) {
      console.log('Error en la solicitud de obtener el nombre de usuario:', error);
    }
  };

  return (
    <Router>
      <nav className="navbar">
        <h1 className='navheader'>Pasantías UAI</h1>
        <li className="welcome-message">
          {username && <span>Bienvenido, {username}</span>}
        </li>
        <ul>
          {username && (
            <li>
              <Button
                color="danger"
                onClick={handleLogout}
                className="logout-btn"
                style={{ marginTop: '8px', marginRight: '8px', padding: '3px 6px', fontSize: '14px' }}
              >
                Cerrar Sesión
              </Button>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={redirect ? <Navigate to={redirect} /> : <LoginPage />} /> {/* Ruta por defecto */}
        <Route path="/alumno" element={<HomePageAlumno />} />
        <Route path="/admin" element={<HomePageAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;