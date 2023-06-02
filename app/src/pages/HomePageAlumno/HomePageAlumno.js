import 'bootstrap/dist/css/bootstrap.css'
import './HomePageAlumno.css';
import Formulario from '../../Formulario/Formulario.js'
import FormEmpresa from '../../FormEmpresa/FormEmpresa';
import React, { useState, useEffect } from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';

const HomePageAlumno = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState('');
  const rut = '20.358.711-2';
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

  const generarContenido = (step) => {
    const alumno = ({RUN_Alumno: '20.358.711-2', Nombres: 'Alejandro', Apellidos: 'Romero', Mail_UAI: 'aleromero@uai.com', Mail_Personal: 'aleromeros1999@gmail.com'});
    console.log(step)
    switch (step){
      case 1:
      return (
        <Formulario  Paso={step} alumno = {alumno}/>
      );
      case 1.5:
        console.log("prueba")
        return (
          <div className="center">
        <h3>Ya se aceptó el reglamento, se desbloqueará el Paso 2 cuando el administrador acepte sus requisitos</h3>
        </div>
      );
      case 2:
        return (
          <FormEmpresa RUN={rut} Paso={step} />
        );
      case 2.5:
        return (
          <p>Se ha enviado la información de la empresa y supervisor correctamente, porfavor espere a una respuesta del administrador para continuar con el paso 3</p>
        )
    }
  };
  const renderButtons = () => {
    const buttons = [];
    console.log(currentStep);
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleClick(i)}
          disabled= {i !== currentStep}
          color = {i === currentStep ? 'primary' : 'secondary'}
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
