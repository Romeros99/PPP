import 'bootstrap/dist/css/bootstrap.css'
import './HomePageAlumno.css';
import Formulario from '../../Formulario/Formulario.js'
import FormEmpresa from '../../FormEmpresa/FormEmpresa';
import FormProyecto from '../../FormProyecto/FormProyecto'
import React, { useState, useEffect } from 'react';
import {Button} from 'reactstrap';

const HomePageAlumno = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState('');
  const [cuenta, setCuenta] = useState({mail: '', run: '', nombre: '',role: ''});

  
  useEffect(() => {
    fetchCuenta();
  }, []);
  //Fucion Get para obtener el rut de la cuenta que inicio sesion
  const fetchCuenta = async () => {
    try {
      const response = await fetch('/omega/decode_user_token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const newData = await response.json();
      setCuenta(newData);
      getPasoAlumno(newData.run);

    } catch (error) {
      console.error('Error fetching RUNs:', error);
    }
  };
  //Función para setear el paso del alumno.
  const getPasoAlumno = async (rut) => {
    try {
      const response = await fetch(`/api/bd/pasoactual?RUN=${rut}`);
  
      if (!response.ok) {
        throw new Error('Error en la búsqueda del Paso del Alumno');
      }
      const data = await response.json();
      const step = data.step;

      //Setter del CurrentStep
      setCurrentStep(step);
      console.log("step:", step)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleClick = (step) => {
    setContent(generarContenido(step));
  };
  //segun el paso en que se encuentra muestra distintas situaciones
  const generarContenido = (step) => {
    switch (step){
      case 1:
      return (
        <Formulario  Paso={step} RUN = {cuenta.run}/>
  
      );
      case 1.5:
        return (
          <div className="center">
        <h3>Ya se aceptó el reglamento, se desbloqueará el Paso 2 cuando el administrador acepte sus requisitos</h3>
        </div>
      );
      case 2:
        return (
          <FormEmpresa RUN={cuenta.run} Paso={step} />
        );
      case 2.5:
        return (
          <p>Se ha enviado la información de la empresa y supervisor correctamente, porfavor espere a una respuesta del administrador para continuar con el paso 3</p>
        )
      case 5:
        return(
          <FormProyecto/>
        )
    }
  };
  //habilita y muestra colores de pasos segun el que está
  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleClick(i)}
          disabled= {i !== currentStep}
          color = {i === currentStep ? 'primary' : (currentStep > i ? 'success' : 'secondary')}
          style = {{margin: '5px', fontSize: '20px'}}
        >
          Paso {i}
        </Button>
      
      );
    }
    return buttons;
  }
  //se muestra el componente que se importa desde Formulario.js
  return (
    <div>
      <h2 style = {{textAlign: 'center'}}>Pasos</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}> {renderButtons()}</div>
      <div style={{ marginTop: '30px' }}>{content}</div>
    </div>
  );
  };

export default HomePageAlumno;
