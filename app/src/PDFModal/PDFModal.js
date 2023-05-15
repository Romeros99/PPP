import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import './PDFModal.css';

function PDFModal({pdfUrl, Alumno}) {
  // Correos
  const [comentarios, setComentarios] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [alumno, setAlumno] = useState(Alumno);
  
  const handleRechazar = () => {
    setShowModal(true);
  };

  const sendDataAlumno = async () => {
    try {
      const respuesta = await fetch('/api/bd/eliminar/alumno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: alumno.RUN_Alumno,
        })
      })
  
      const data = await respuesta.json();
      
      if (data.error) {
        alert(data.error);
      } else {
        alert("Alumno eliminado exitosamente!");
      }
    } catch (error) {
      alert('ERROR: Error en la eliminación del alumno.')
    }
  }

  const sendDataReglamento = async () => {
    try {
      const respuesta = await fetch('/api/bd/eliminar/reglamento', {
       method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: alumno.RUN_Alumno,
        })
      })
  
      await sendDataAlumno();
    } catch (error) {
      alert('ERROR: Error en la eliminación del alumno.')
    }
  }

  const sendDataPasantia = async () => {
    try {
      const respuesta = await fetch('/api/bd/crear/pasantia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: alumno.RUN_Alumno,
        })
      })
      
      const data = await respuesta.json();
      
      if (data.error) {
        alert(data.error);
      } else {
        alert('Pasantía creada!')
      }
    } catch (error){
      alert('ERROR: Error en la aceptación del reglamento.')
    }
  }

  const enviarCorreo = async () => {
    let to = alumno.Mail_UAI; //Sacar de la base de datos para cada alumno
    const subject = 'Notificacion Pasantias UAI';
    const text = 'Se han aceptado sus requisitos de pasantia'
    const html = `<p>Estimado ${alumno.Nombres + ' ' + alumno.Apellidos},</p>
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
    
    alert('Se notificará al alumno la aceptacion de requisitos');
    sendDataPasantia();
  };

  const handleEnviarComentarios = async () => {
    // Aquí puedes enviar los comentarios por correo electrónico utilizando la API de SendGrid
    if (comentarios.trim() === '') {
      alert('El comentario no puede estar vacío');
      return;
    }
    
    const to = alumno.Mail_UAI; //Notificar al alumno
    const subject = 'Notificacion Pasantias UAI';
    const text = 'Requisitos rechazados'
    const html = `<p>Estimado ${alumno.Nombres + ' ' + alumno.Apellidos},</p>
                  <div>
                    <p>Junto con saludarlo, le informamos que se ha rechazado su solicitud para iniciar su track de titulación por medio de pasantía por la siguiente razón:</p>
                    <div>
                      <p>${comentarios}</p>
                    </div>
                    <p>Cualquier consulta, por favor contactornos por medio del siguiente correo pasantiasppuai@gmail.com</p>
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
    alert("Se notificará al alumno la razon de rechazo")
    setShowModal(false);
    sendDataReglamento();
  };

  return (
    <div className='center'>     
      <h1>Confirmación de requisitos</h1>
      <embed className='pdf' src= {pdfUrl} width="800" height="575" type='application/pdf' />

      <div className='botones'>
      <Button className='boton-aceptar' onClick={enviarCorreo}>Aceptar</Button>
      <Button className='boton-rechazar' onClick={handleRechazar}>Rechazar</Button>
      </div>

      <Modal isOpen={showModal}>
        <ModalHeader>
        <h2>Comentarios</h2>
        </ModalHeader>
        <ModalBody>
        <textarea className="comentarios-textarea" value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
        </ModalBody>
        <div className='boton-comentario' style={{ display: "flex", justifyContent: "center" , marginBottom:"20px"}}>
        <Button className='boton-enviar' onClick={handleEnviarComentarios} style={{marginRight: "40px"}}>Enviar</Button>
        <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
      </Modal>
    </div>
    
  );
}

export default PDFModal;