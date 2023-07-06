import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import './PDFModal.css';
import Alerta from '../Alerta/Alerta.js';

function PDFModal({pdfUrl, Alumno}) {
   //define constantes con sus metodos set 
  const [comentarios, setComentarios] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTipo, setAlertTipo] = useState('');
  const [showAlert2, setShowAlert2] = useState(false);
  const [alertMessage2, setAlertMessage2] = useState('');
  const [alertTipo2, setAlertTipo2] = useState('');
  const [showButtons, setShowButtons] = useState(true);

  const handleRechazar = () => {
    setShowModal(true);
  };

  //envia realiza una solicitud post para eliminar registro de un reglamento de la base de datos
  const sendDataReglamento = async () => {
    try {
      const respuesta = await fetch('/api/bd/eliminar/reglamento', {
       method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: Alumno.RUN_Alumno,
        })
      })
  
    } catch (error) {
      setShowAlert(true);
      setAlertMessage('ERROR: Error en la eliminación del alumno.');
      setAlertTipo('danger');
    }
  }

  //envia  solicitud  post para crear una pasantia en la base de datos
  const sendDataPasantia = async () => {
    try {
      const respuesta = await fetch('/api/bd/crear/pasantia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: Alumno.RUN_Alumno
        })
      })
      
      const data = await respuesta.json();
      
      if (data.error) {
        throw new Error(data.error);
      } else {
        setShowAlert(true);
        setAlertMessage('Pasantía creada, se notificará al alumno.');
        setAlertTipo('success');
        setShowButtons(false);
      }
    } catch (error){
      setShowAlert(true);
      setAlertMessage('ERROR: Error en la aceptación del reglamento.');
      setAlertTipo('danger');
    }
  }

  //crea el correo electronico y lo envia por solicitud post para realizar el envio.
  const sendMail = async () => {
    let to = Alumno.Mail_UAI; //Sacar de la base de datos para cada alumno
    const subject = 'Notificacion Pasantias UAI';
    const text = 'Se han aceptado sus requisitos de pasantia'
    const html = `<p>Estimado ${Alumno.Nombres + ' ' + Alumno.Apellidos},</p>
                  <div>
                    <p>Junto con saludarlo, le informamos que se ha aceptado su solicitud para iniciar su track de titulación por medio de pasantía. Por favor, ingrese los datos de la empresa en el Paso 2 que estará habilitado en su cuenta de Pasantías Paso a Paso.</p>
                    <p>Cualquier consulta, no dude contactornos por medio del siguiente correo pasantiasppuai@gmail.com</p>
                  </div>
                  <p>Atentamente,</p>
                  <div>
                    <p>Coordinación de Prácticas y Pasantías UAI.</p>
                  </div>`

    fetch('/api/mail/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, text, html }),
      //mode: 'no-cors', //esto evita el error de cors pero no se envia el correo
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    
    sendDataPasantia();
  };

  //escribe y envia solicitud post para enviar el correo electronico con los comentarios en caso de ser rechazado
  const handleSendComments = async () => {
    // Aquí puedes enviar los comentarios por correo electrónico utilizando la API de SendGrid
    if (comentarios.trim() === '') {
      setShowAlert2(true);
      setAlertMessage2('El comentario no puede estar vacío.');
      setAlertTipo2('warning');
      return;
    }
    
    const to = Alumno.Mail_UAI; //Notificar al alumno
    const subject = 'Notificacion Pasantias UAI';
    const text = 'Requisitos rechazados'
    const html = `<p>Estimado ${Alumno.Nombres + ' ' + Alumno.Apellidos},</p>
                  <div>
                    <p>Junto con saludarlo, le informamos que se ha rechazado su solicitud para iniciar su track de titulación por medio de pasantía por la siguiente razón:</p>
                    <div>
                      <p>${comentarios}</p>
                    </div>
                    <p>Cualquier consulta, por favor contactarse por medio del siguiente correo pasantiasppuai@gmail.com</p>
                  </div>
                  <p>Atentamente,</p>
                  <div>
                    <p>Coordinación de Prácticas y Pasantías UAI.</p>
                  </div>`
  
    fetch('api/mail/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, text, html }),
      //mode: 'no-cors', //esto evita el error de cors pero no se envia el correo
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
    // Después de enviar los comentarios, cierra la caja de comentarios
    setShowAlert(true);
    setAlertMessage('Pasantía rechazada, se notificará al alumno la razón del rechazo.');
    setAlertTipo('success');
    setShowButtons(false);
    setShowModal(false);
    sendDataReglamento();
  };

  //visualizacion de pdf con botones de aceptar, rechazar y modal de comentarios
  return (
    <div className='center'>     
      <h1>Confirmación de requisitos</h1>
      <embed className='pdf' src= {pdfUrl} width="800" height="575" type='application/pdf' />
      <div style = {{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
        {<Alerta mensaje = {alertMessage} tipo = {alertTipo} showAlert = {showAlert} setShowAlert = {setShowAlert}/>}
      </div>
      {showButtons ? (
        <div className='botones'>
          <Button className='boton-aceptar' onClick={sendMail}>Aceptar</Button>
          <Button className='boton-rechazar' onClick={handleRechazar}>Rechazar</Button>
        </div>
        ) : 
        (
        <div></div>
        )
      }

      <Modal isOpen={showModal}>
        <ModalHeader>
          <h2>Comentarios</h2>
        </ModalHeader>
        <ModalBody>
          <textarea className="comentarios-textarea" value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
        </ModalBody>
        <div style = {{ textAlign: 'center', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px' }}>
          {<Alerta mensaje = {alertMessage2} tipo = {alertTipo2} showAlert = {showAlert2} setShowAlert = {setShowAlert2}/>}
        </div>
        <div className='boton-comentario' style={{ display: "flex", justifyContent: "center" , marginBottom:"20px"}}>
          <div>
            <Button className='boton-enviar' onClick={handleSendComments} style={{marginRight: "40px"}}>Enviar</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          </div>
        </div>
      </Modal>
    </div>
    
  );
}

export default PDFModal;