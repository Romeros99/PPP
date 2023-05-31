import bcrypt from 'bcryptjs';
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

  const handleLogin = async() => {
    // Lógica para el inicio de sesión
    if (userType === 'alumno' && username && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      // Iniciar sesión como alumno
      console.log('Iniciar sesión como alumno:', username, password);
    } else if (userType === 'administrador' && username && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
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
      placeholderText = 'Mail Alumno';
    } else if (userType === 'administrador') {
      placeholderText = 'Mail Administrador';
    }
    return (
      <div>
        <Button onClick={handleGoBack}>
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
                <h2>Tipo de usuario</h2>
                <div>
                <Button type="button" color = "primary" onClick={() => handleUserType('alumno')}>Alumno</Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="button" color = "secondary" onClick={() => handleUserType('administrador')}>Administrador</Button>
                </div>
            </div>
            )}
        </div>
        </div>
    </div>
  );
};
  
  export default LoginPage;