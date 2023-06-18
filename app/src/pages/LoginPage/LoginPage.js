import 'bootstrap/dist/css/bootstrap.css';
import './LoginPage.css';
import React, { useState } from 'react';
import {Button} from '@mui/material';
import { Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField } from '@mui/material'

const LoginPage = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[showcredential_alert, setshowcredential_alert]= useState(false);
  
  const handleUserType = (type) => {
    setUserType(type);
  };

  const handleGoBack = () => {
    setUserType('');
    setUsername('');
    setPassword('');
    setshowcredential_alert(false);
  };

 

  //llama funciones para obtener cookie de sesion de usuario
  const Login_alumno = async (mail, password) =>{
    try {
      const response = await fetch('/omega/login_Alumnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: mail,
          password: password
        })
      });
      const data = await response.json()
      console.log(data.message);
      if (data.message==='valid_credentials') {
        
        window.location.href = "/alumno";
      } else {
        setshowcredential_alert(true);
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Realiza las acciones necesarias en caso de error
    }
  }

   //llama funciones para obtener cookie de sesion de usuario
   const Login_admin = async (mail, password) =>{
    try {
      const response = await fetch('/omega/login_Admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: mail,
          password: password
        })
      });
      const data = await response.json()
      console.log(data.message);
      if (data.message==='valid_credentials') {
        
        window.location.href = "/admin";
      } else {
        setshowcredential_alert(true);
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Realiza las acciones necesarias en caso de error
    }
  }



  const handleLogin = async() => {
    // Lógica para el inicio de sesión
    if (userType === 'alumno' && username && password) {
      Login_alumno(username, password);
      
      // Iniciar sesión como alumno
      console.log('Iniciar sesión como alumno:', username, password);
    } else if (userType === 'administrador' && username && password) {
      Login_admin(username, password);

      // Iniciar sesión como administrador
      console.log('Iniciar sesión como administrador:', username, password);
    } else {
      // Mostrar mensaje de error si no se seleccionó un tipo de usuario o se dejó algún campo vacío
      alert('Completa todos los campos');
    }
  };

  
  
  const renderLoginForm = () => {
    let placeholderText = '';
    if (userType === 'alumno') {
      placeholderText = 'Mail UAI ';
    } else if (userType === 'administrador') {
      placeholderText = 'Mail UAI';
    }
    return (
      <div>
        <Button variant="outlined"
          onClick={handleGoBack}
          style={{ fontSize: '10px', textAlign: 'center' }}
        >
          <ArrowBackIcon color="primary" />
          
        </Button>
        <h2 style={{ textAlign: 'center', fontSize: '19px', marginBottom: '10%', marginTop: '10px' }}>
          Iniciar sesión
        </h2>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <TextField
            type="text"
            id="outlined-basic"
            label="Mail UAI"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
          <TextField
            type="password"
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '5px' }}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <Button variant="contained" className="loginbtn" color="primary" onClick={handleLogin}>
            Iniciar sesión
          </Button>
        </div>
        {showcredential_alert && <Alert severity="error">Credenciales de acceso inválidas</Alert>}
      </div>
    );
  };
  
  
  return (
    
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {userType ? (
            renderLoginForm()
            ) : (
            <div>
                <h2 style = {{textAlign: 'center', fontSize: '25px', marginBottom: '30px'}}>Tipo de usuario</h2>
                <div className="button-container">
                  <Button variant="contained" color="primary" onClick={() => handleUserType('alumno')}>
                    Alumno
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="contained" color="secondary" onClick={() => handleUserType('administrador')}>
                    Administrador
                  </Button>
                </div>
            </div>
            )}
        </div>
        </div>
    </div>
  );
};
  
  export default LoginPage;