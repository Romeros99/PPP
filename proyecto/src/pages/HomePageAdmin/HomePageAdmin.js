import './HomePageAdmin.css';
import sgMail from '@sendgrid/mail';
import React, { useState } from "react";
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';
import axios from 'axios';


export default function HomePageAdmin() {
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const enviarCorreo = () => {
  const to = 'fernandogonz2015@icloud.com';
  const subject = 'Notificacion Pasantias UAI';
  const text = 'Se han aceptado sus requisitos de pasantia'
  const html = '<p>Se han aceptado sus requisitos de pasantia</p>'

  fetch('http://localhost:3001/send-email', {
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
  };

  const [comentarios, setComentarios] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRechazar = () => {
    setShowModal(true);
  };

  const handleEnviarComentarios = () => {
    // Aquí puedes enviar los comentarios por correo electrónico utilizando la API de SendGrid
    if (comentarios.trim() === '') {
      alert('El comentario no puede estar vacío');
      return;
    }

    const to = 'fernandogonz2015@icloud.com';
    const subject = 'Notificacion Pasantias UAI';
    const text = 'Requisitos rechazados'
    const html = `<p>Se han rechazado sus requisitos, Comentarios: ${comentarios}</p>`
  
    fetch('http://localhost:3001/send-email', {
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
    setShowModal(false);
  };


  return (

    <div className='center'>     

      <h1>Confirmación de requisitos</h1>
      <embed src="mi-proyecto/src/pages/HomePageAlumno/guia 1.pdf" width="500" height="375" type='application/pdf' />

      <div className='botones'>
      <button onClick={enviarCorreo}>Aceptar</button>
      <button onClick={handleRechazar}>Rechazar</button>
      </div>


      <Modal isOpen={showModal}>
        <h2>Comentarios</h2>
        <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
        <button onClick={handleEnviarComentarios}>Enviar</button>
        <button onClick={() => setShowModal(false)}>Cancelar</button>
      </Modal>
    </div>
  );
}



  const [comentarios, setComentarios] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRechazar = () => {
    setShowModal(true);
  };

  const handleEnviarComentarios = () => {
    // Aquí puedes enviar los comentarios por correo electrónico utilizando la API de SendGrid
    if (comentarios.trim() === '') {
      alert('El comentario no puede estar vacío');
      return;
    }

    sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);
  
    const msg = {
      to: 'fernandogonz2015@icloud.com', // Reemplaza con el correo electrónico del destinatario
      from: 'pasantiasppuai@gmail.com', // Reemplaza con tu correo electrónico de SendGrid
      subject: 'Confirmación de requisitos', // Asunto del correo electrónico
      text: comentarios, // Contenido del correo electrónico
    };
    sgMail.send(msg);


    // Después de enviar los comentarios, cierra la caja de comentarios
    setShowModal(false);
  };


  return (

    <div className='center'>     

      <h1>Confirmación de requisitos</h1>
      <embed src="mi-proyecto/src/pages/HomePageAlumno/guia 1.pdf" width="500" height="375" type='application/pdf' />

      <div className='botones'>
      <button onClick={enviarCorreo}>Aceptar</button>
      <button onClick={handleRechazar}>Rechazar</button>
      </div>


      <Modal isOpen={showModal}>
        <h2>Comentarios</h2>
        <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
        <button onClick={handleEnviarComentarios}>Enviar</button>
        <button onClick={() => setShowModal(false)}>Cancelar</button>
      </Modal>
    </div>
  );
}

