import 'bootstrap/dist/css/bootstrap.css'
import './HomePageAlumno.css';
import Formulario from '../../Formulario/Formulario.js'
import React, { useState } from 'react';
import {Button} from 'reactstrap';

const HomePageAlumno = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState('');

  const handleClick = (step) => {
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
          <Formulario/>
        );
      case 2:
        return (
          <p>hola</p>
        )
    }
  };
  const renderButtons = () => {
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
