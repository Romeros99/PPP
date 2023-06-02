import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import FuncionPaso from '../FuncionPaso/FuncionPaso';

function Formulario({Paso, alumno}) {
  //Definición de constantes en donde se almacenará el alumno, el reglamento y si se debe o no mostrar el modal.
  const [reglamento, setReglamento] = useState({RUN_Alumno: alumno.RUN_Alumno, Fecha: getCurrentDateString()});
  const handleReglamento = () => {
    const RUN = alumno.RUN_Alumno;
    console.log(RUN);
    Paso = Paso + 0.5;
    FuncionPaso(Paso, RUN);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  }

  
  //Función tipo POST para agregar un registro al la tabla de Reglamentos del backend
  const entregarDataReglamento = async () => {
    try {
      const respuesta = await fetch('/api/bd/crear/reglamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: reglamento.RUN_Alumno,
          Fecha: reglamento.Fecha
        })
      })
      
      const data = await respuesta.json();
      
      if (data.error) {
        alert(data.error);
      } else {
        alert('Reglamento aceptado!')
        handleReglamento();
      }
    } catch (error){
      alert('ERROR: Error en la aceptación del reglamento.')
    }
  }

  //Función para convertir un número en String y, en caso de tener un dígito (X), pasarlo al formato "0X" - Sirve para estandarizar el formato de DateTime.
  function convertNumberFormat(num) {
    if (num < 10){
      return ('0' + num.toString());
    }
    else{
      return (num.toString());
    }
  }
  
  //Genera un registro de el DateTime actual en formato "YYYY-MM-DD HH:mm:ss".
  function getCurrentDateString() {
    const day = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const hours = new Date().getHours()
    const min = new Date().getMinutes()
    const sec = new Date().getSeconds()
    return (year.toString() + '-' + convertNumberFormat(month) + '-' + convertNumberFormat(day) + ' ' +  convertNumberFormat(hours) + ':' + convertNumberFormat(min) + ':' + convertNumberFormat(sec))
  }
  
  //Ejecuta todos los comandos que se deben ejecutar al momento de confirmar el reglamento
  const funcConfirmado = () => {
    //Almacenar la hora en que se aceptó
    setReglamento(prevState => ({
      ...prevState,
      ['Fecha']: getCurrentDateString()
    }));
    //Crear al alumno y al registro de reglamento en la BD.
    console.log(alumno);
    entregarDataReglamento();
  }
  
  //Se retorna el código HTML del Formulario que recibe la información del Alumno y genera sus registros en caso de aceptar el reglamento.
  return (
    <div className="center">
        <h1>Confirmación de reglamento</h1>
        <div>
        <embed
          src="http://localhost:4000/omega/pdf/DECRETO ACADEMICO REGLAMENTO FIC PRACTICA.pdf"
          width="800"
          height="575"
          type="application/pdf"
        />
        
        <div className="button-container">
        <Button className="accept-button " onClick={() => funcConfirmado()}>Aceptar</Button>
        <Button className="reject-button">Rechazar</Button>
        </div>
        </div>
  </div>
  );
}

export default Formulario;