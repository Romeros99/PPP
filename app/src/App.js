import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import HomePageAlumno from "./pages/HomePageAlumno/HomePageAlumno";
import HomePageAdmin from "./pages/HomePageAdmin/HomePageAdmin";
import LoginPage from './pages/LoginPage/LoginPage';
import AceptacionSupervisor from './SupervisorRespuesta/AceptacionSupervisor';
import RechazoSupervisor from './SupervisorRespuesta/RechazoSupervisor';

function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [redirect, setRedirect] = useState(null);
  const [showNavBar, setShowNavBar] = useState(true);
  const [showUsername, setShowUsername] = useState(false); // Nueva variable de estado

  useEffect(() => {
    getUsername();
  }, []);

  const handleLogout = () => {
    document.cookie = "access-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };
//verifica el rol del usuario y redirecciona a su pagina correspondiente
  const checkRolAndRedirect = async (role) => {
    if (role === 'alumno') {
      setRedirect('/alumno');
    } else if (role === 'admin') {
      setRedirect('/admin');
    } else {
      setRedirect('/');
    }
  };
//obtiene nombre de usuario decodificando el token de sesion 
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
        setShowUsername(true); // Actualización del estado
      } else {
        console.log('Error al obtener el nombre de usuario');
      }
    } catch (error) {
      console.log('Error en la solicitud de obtener el nombre de usuario:', error);
    }
  };

  return (
    <Router>
      {showNavBar && (
        <nav className="navbar">
          <h1 className='navheader'>Pasantías UAI</h1>
          {showUsername && (
            <li className="welcome-message">
              {username && <span>Bienvenido, {username}</span>}
            </li>
          )}
          <ul>
            {username && (
              <li>
                <Button
                  color="danger"
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{ marginTop: '8px', marginRight: '8px', padding: '3px 6px', fontSize: '14px' }}
                >
                  <LogoutIcon color="white" />Cerrar Sesión
                </Button>
              </li>
            )}
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/" element={redirect ? <Navigate to={redirect} /> : <LoginPage />} />
        <Route path="/alumno" element={<HomePageAlumno />} />
        <Route path="/admin" element={<HomePageAdmin />} />
        <Route path="/aceptar/:ID_Respuesta" element={<AceptacionSupervisor setShowNavBar={setShowNavBar} />} />
        <Route path="/rechazo/:ID_Respuesta" element={<RechazoSupervisor setShowNavBar={setShowNavBar} />} />
      </Routes>
    </Router>
  );
}

export default App;
