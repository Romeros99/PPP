import 'bootstrap/dist/css/bootstrap.css'
import './HomePageAlumno.css';
import Formulario from '../../Formulario/Formulario.js'
import FormEmpresa from '../../FormEmpresa/FormEmpresa';
import React, { useState } from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';

const HomePageAlumno = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState('');
  const [showReglamento, setShowReglamento] = useState(true);
  const rut = '19.248.635-2';

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
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const checkRun = (e) => {
    if (rut) {
      axios
        .get('/api/bd/pendientes')
        .then((res) => {
          let foundMatch = false;
          res.data.forEach((row) => {
            if (row.RUN_Alumno === rut) {
              foundMatch = true;
            }
          });
          setShowReglamento(!foundMatch);
        })
        .catch((err) => {
          setShowReglamento(true);
        });
    }
  }
  
  const handleClick = (step) => {
    if (step === 1){
      console.log("prueba")
      checkRun();
    }
    if (step === currentStep) {
      // Realizar acciones correspondientes al paso actual
      console.log(`Paso ${step} seleccionado`);
      // Establecer el contenido según el paso actual
      setContent(generarContenido(step));
    } else {
      console.log(`No puedes seleccionar el Paso ${step} en este momento`);
    }
  };

  const generarContenido = (step) => {
    switch (step) {
      case 1:
        return (
          <Formulario reglamento = {showReglamento}/>
        );
      case 2:
        return (
          <FormEmpresa/>
        )
    }
  };
  const renderButtons = () => {
    getPasoAlumno(rut);
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleClick(i)}
          disabled= {i !== currentStep}
          color = {i === currentStep ? 'primary' : 'secondary'}
          style = {{margin: '5px', fontSize: '20px'}}
        >
          Step {i}
        </Button>
      );
    }
    return buttons;
  }
  //se muestra el componente que se importa desde Formulario.js
  return (
    <div>
      <h2 >Pasos</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}> {renderButtons()}</div>
      <div style={{ marginTop: '30px' }}>{content}</div>
    </div>
  );
  };

export default HomePageAlumno;
