import 'bootstrap/dist/css/bootstrap.css'
import './HomePageAlumno.css';
import Formulario from '../../Formulario/Formulario.js'
import FormEmpresa from '../../FormEmpresa/FormEmpresa';
import FormProyecto from '../../FormProyecto/FormProyecto'
import React, { useState, useEffect } from 'react';
import {Button, Tooltip} from 'reactstrap';

const HomePageAlumno = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState('');
  const [cuenta, setCuenta] = useState({mail: '', run: '', nombre: '',role: ''});
  const [activeTooltip, setActiveTooltip] = useState(null);

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
        );
      case 5:
        return(
          <FormProyecto RUN_Alumno = {cuenta.run}/>
        );
      case 5.5:
        return (
          <p>Se ha enviado la información del proyecto, porfavor espere a una respuesta del administrador para continuar con el paso 6</p>
        );
    }
  };

  // Esta función devuelve el resumen para cada botón en base a su número
  const getSummaryPaso = (buttonNumber) => {
    switch (buttonNumber) {
      case 1:
        return 'Paso 1: Aceptación de Reglamento - Lectura a conciencia del reglamento y las condiciones que se deben aceptar por parte del alumno para dar inicio a la pasantía.';
      case 2:
        return 'Paso 2: Inscripción de Información de Empresa - El alumno debe ingresar los datos de la empresa y del supervisor para la pasantía.';
      case 3:
        return 'Paso 3: Verificación de Información de Empresa - Proceso en donde el administrador debe verificar los datos de la empresa y del supervisor ingresados por el alumno.';
      case 4:
        return 'Paso 4: Verificación del Supervisor - Proceso en donde el supervisor debe confirmar que el estudiante está realizando la pasantía en la empresa a su cargo';
      case 5:
        return 'Paso 5: Inscripción de Información de Proyecto - El alumno debe ingresar un detalle del proyecto que se desea ralizar durante la pasantía.';
      case 6:
        return 'Paso 6: Reunión con Profesor Guía - Paso en donde se agenda una reunión entre el alumno y el profesor guía para explicar el proyecto y orientar su inicio.';
      case 7:
        return 'Paso 7: Evaluación de Avance 1 - Portal de entrega del primer avance del informe y la primera presentación con el profesor guía.';
      case 8:
        return 'Paso 8: Evaluación de Avance 2 - Portal de entrega del segundo avance del informe y la segunda presentación con el profesor guía.';
      case 9:
        return 'Paso 9: Evaluación de Entrega Final - Portal de entrega para el informe final y la presentación del proyecto al profesor guía.';
      default:
        return '';
    };
  };

  //Renderización de los botones con la información de resumen correspondiente
  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      const isActive = activeTooltip === i;
      buttons.push(
        <div key={i}>
          <div onMouseOver={() => setActiveTooltip(i)} id={`Button${i}`}>
            <Button
              onClick={() => handleClick(i)}
              disabled={i !== currentStep}
              color={i === currentStep ? 'primary' : currentStep > i ? 'success' : 'secondary'}
              style={{ margin: '5px', fontSize: '20px' }}
            >
              Paso {i}
            </Button>
          </div>
          <Tooltip isOpen={isActive} target={`Button${i}`}>
            {getSummaryPaso(i)}
          </Tooltip>
        </div>
      );
    }
    return buttons;
  };

  //se muestra el componente que se importa desde Formulario.js
  return (
    <div>
      <h2 style = {{textAlign: 'center'}}>Pasos</h2>
      <div onMouseLeave={() => setActiveTooltip(null)} style={{ display: 'flex', justifyContent: 'center' }}> {renderButtons()}</div>
      <div style={{ marginTop: '30px' }}>{content}</div>
    </div>
  );
  };

export default HomePageAlumno;
