import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

function PDFModal({ pdfUrl }) {
  // Correos
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [comentarios, setComentarios] = useState('Ingrese su Comentario');
  const [showModal, setShowModal] = useState(false);

  const handleRechazar = () => {
    setShowModal(true);
  };

  const enviarCorreo = () => {
    let to = 'fernandogonz2015@icloud.com'; //Sacar de la base de datos para cada alumno
    const subject = 'Notificacion Pasantias UAI';
    const text = 'Se han aceptado sus requisitos de pasantia'
    const html = '<p>Se han aceptado sus requisitos de pasantía</p>'

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
  };

  const handleEnviarComentarios = () => {
    // Aquí puedes enviar los comentarios por correo electrónico utilizando la API de SendGrid
    if (comentarios.trim() === '') {
      alert('El comentario no puede estar vacío');
      return;
    }
    
    const to = 'fernandogonz2015@icloud.com'; //Notificar al alumno
    const subject = 'Notificacion Pasantias UAI';
    const text = 'Requisitos rechazados'
    const html = `<p>Se han rechazado sus requisitos por la siguiente razón:: ${comentarios}</p>`
  
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
    setShowModal(false);
  };

  //PDF

  const [modalAccepted, setModalAccepted] = useState(false);
//"window.opener.setModalAccepted(true); window.close()"
//"window.close()"
  useEffect(() => {
    if (pdfUrl) {
      const popupWindow = window.open('', '_blank', 'width=600,height=800');
      const content = `
        <html>
          <body>
            <iframe src="${pdfUrl}" width="100%" height="700"></iframe>
            <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
              <button onClick= ${enviarCorreo()} ${"window.opener.setModalAccepted(true); window.close()"}>Aceptar</button> 
              <button onClick= ${handleRechazar()} ${"window.close()"}>Rechazar</button>
            </div>
            <Modal isOpen=${showModal}>
              <h2>Comentarios</h2>
              <textarea value=${comentarios} onChange=${(e) => setComentarios(e.target.value)} />
              <button onClick=${handleEnviarComentarios()}>Enviar</button>
              <button onClick=${setShowModal(false)}>Cancelar</button>
            </Modal>
          </body>
        </html>`;
      popupWindow.document.open();
      popupWindow.document.write(content);
      popupWindow.document.close();
    }
  }, [pdfUrl]);

  return (
    <div>
      {modalAccepted && <p>¡Modal aceptado!</p>}
    </div>
  );
}

export default PDFModal;