import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';

function Formulario() {
    const [alumno, setAlumno] = useState({RUN_Alumno: '', Nombres: '', Apellidos: '', Mail_UAI: '', Mail_Personal: ''});
    const [reglamento, setReglamento] = useState({RUN_Alumno: '', Fecha: getCurrentDateString()});
    const [showModal, setShowModal] = useState(false);
  
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
  
    const entregarDataAlumno = async () => {
      try {
        const respuesta = await fetch('/api/bd/crear/alumno', {
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
          entregarDataReglamento();
        }
      } catch (error){
        alert('ERROR: Error en el intento de creación de alumno.')
      }
    };
  
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
  
    function convertNumberFormat(num) {
      if (num < 10){
        return ('0' + num.toString());
      }
      else{
        return (num.toString());
      }
    }
  
    function getCurrentDateString() {
      const day = new Date().getDate() //current date
      const month = new Date().getMonth() + 1 //current month
      const year = new Date().getFullYear() //current year
      const hours = new Date().getHours() //current hours
      const min = new Date().getMinutes() //current minutes
      const sec = new Date().getSeconds() //current seconds
      return (year.toString() + '-' + convertNumberFormat(month) + '-' + convertNumberFormat(day) + ' ' +  convertNumberFormat(hours) + ':' + convertNumberFormat(min) + ':' + convertNumberFormat(sec))
    }
  
    const funcConfirmado = () => {
      setReglamento(prevState => ({
        ...prevState,
        ['Fecha']: getCurrentDateString()
      }));
      console.log(reglamento.Fecha);
      entregarDataAlumno();
      setShowModal(false);
    }
     
  const onSubmit = (event) => {
    event.preventDefault();
    entregarDataAlumno();
  };
 
  return (
    <div className="center">
        <h1>Confirmación de reglamento</h1>
        <embed src= "http://localhost:5000/api/pdf/DECRETO ACADEMICO REGLAMENTO FIC PRACTICA.pdf" width="800" height="575" type='application/pdf'/>
    
        <div className="button-container">
            <Button className="accept-button" onClick={() => setShowModal(true)}>Aceptar</Button>
            <Button className="reject-button">Rechazar</Button>
        </div>
    
        <Modal isOpen={showModal}>
            <ModalHeader>
                <h2>Ingrese sus datos</h2>
            </ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit}>
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