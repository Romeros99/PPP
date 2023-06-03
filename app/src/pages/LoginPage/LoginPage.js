import 'bootstrap/dist/css/bootstrap.css';
import './LoginPage.css';
import React, { useState } from 'react';
import {Button} from 'reactstrap';

const LoginPage = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUserType = (type) => {
    setUserType(type);
  };

  const handleGoBack = () => {
    setUserType('');
    setUsername('');
    setPassword('');
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
      if (data.message=='valid_credentials') {
        alert("Credenciales validas, bienvenido")
        window.location.href = "/alumno";
      } else {
        alert("credenciales invalidas")
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
      if (data.message=='valid_credentials') {
        alert("Credenciales validas, bienvenido")
        window.location.href = "/admin";
      } else {
        alert("credenciales invalidas")
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
        <Button onClick={handleGoBack} style={{ fontSize: '10px' }}>
            &larr;
          </Button>
        <h2 style = {{textAlign: 'center'}}>Iniciar sesión</h2>
        <div style = {{textAlign: 'center'}}>
          <input
            type="text"
            placeholder={placeholderText}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{marginBottom: '10px', padding: '5px'}}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </div >
        <div style = {{textAlign: 'center'}}>
        <Button  color = "primary" onClick={handleLogin}>Iniciar sesión</Button>
        </div>
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
                  <Button type="button" color="primary" onClick={() => handleUserType('alumno')}>
                    Alumno
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button type="button" color="secondary" onClick={() => handleUserType('administrador')}>
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