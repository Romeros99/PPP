import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

function Formulario() {
  //Definición de constantes en donde se almacenará el alumno, el reglamento y si se debe o no mostrar el modal.
  const [alumno, setAlumno] = useState({RUN_Alumno: '', Nombres: '', Apellidos: '', Mail_UAI: '', Mail_Personal: ''});
  const [reglamento, setReglamento] = useState({RUN_Alumno: '', Fecha: getCurrentDateString()});
  const [showModal, setShowModal] = useState(false);

  //Función en donde se irá cambiando las propiedades del alumno y del reglamento dependiendo de lo que se ingrese en el formulario.
  const setInput = (e) => {
    const {name, value} = e.target;
    setAlumno(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'RUN_Alumno') {
      setReglamento(prevState => ({
        ...prevState,
        [name]:value
      }));
    }
  }
  
  //Request tipo POST para enviar la información de un alumno y crear su registro en la tabla Alumnos de la base de datos.
  const entregarDataAlumno = async () => {
    try {
      const respuesta = await fetch('/omega/bd/crear/alumno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: alumno.RUN_Alumno,
          Nombres: alumno.Nombres,
          Apellidos: alumno.Apellidos,
          Mail_UAI: alumno.Mail_UAI,
          Mail_Personal: alumno.Mail_Personal
        })
      })
        
      const data = await respuesta.json();
      
      if (data.error) {
        alert(data.error);
      } else {
        //Si no hay error en la creación del alumno, se llama a la función para crear el registro del reglamento
        entregarDataReglamento();
      }
    } catch (error){
      alert('ERROR: Error en el intento de creación de alumno.')
    }
  };
  
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
    entregarDataAlumno();
    //Cerrar el modal.
    setShowModal(false);
  }
  
  //Se retorna el código HTML del Formulario que recibe la información del Alumno y genera sus registros en caso de aceptar el reglamento.
  return (
    <div className="center">
        <h1>Confirmación de reglamento</h1>
        <embed src= "http://localhost:4000/omega/pdf/DECRETO ACADEMICO REGLAMENTO FIC PRACTICA.pdf" width="800" height="575" type='application/pdf'/>
    
        <div className="button-container">
            <Button className="accept-button" onClick={() => setShowModal(true)}>Aceptar</Button>
            <Button className="reject-button">Rechazar</Button>
        </div>
    
        <Modal isOpen={showModal}>
            <ModalHeader>
                <h2>Ingrese sus datos</h2>
            </ModalHeader>
        <ModalBody>
            <Form>
            <Form.Group controlId='RUN_Alumno'>
                <Form.Label>RUN del alumno</Form.Label>
                <Form.Control
                type='text'
                name='RUN_Alumno'
                value={alumno.RUN_Alumno}
                onChange={setInput}
                placeholder = "XX.XXX.XXX-X"
                />
            </Form.Group>

            <Form.Group controlId='Nombres'>
                <Form.Label>Nombres del alumno</Form.Label>
                <Form.Control
                type='text'
                name='Nombres'
                value={alumno.Nombres}
                onChange={setInput}
                placeholder = "Juan"
                />
            </Form.Group>

            <Form.Group controlId='Apellidos'>
                <Form.Label>Apellidos del alumno</Form.Label>
                <Form.Control
                type='text'
                name='Apellidos'
                value={alumno.Apellidos}
                onChange={setInput}
                placeholder = "Perez"
                />
            </Form.Group>

            <Form.Group controlId='Mail_UAI'>
                <Form.Label>Mail institucional del alumno</Form.Label>
                <Form.Control
                type='text'
                name='Mail_UAI'
                value={alumno.Mail_UAI}
                onChange={setInput}
                placeholder = "ejemplo@alumnos.uai.cl"
                />
            </Form.Group>

            <Form.Group controlId='Mail_Personal'>
                <Form.Label>Mail personal del alumno</Form.Label>
                <Form.Control
                type='text'
                name='Mail_Personal'
                value={alumno.Mail_Personal}
                onChange={setInput}
                placeholder = "ejemplo@gmail.com"
                />
            </Form.Group>
        <br/>
        <Button className='accept-button' onClick = {() => funcConfirmado()}>Confirmar</Button>
        <Button className='reject-button' onClick={() => setShowModal(false)}>Cancelar</Button>
        </Form>
    </ModalBody>
  </Modal>
  </div>
  );
}

export default Formulario;