import React, { useState } from 'react';

function PDFButton() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleClick = () => {
    console.log('Solicitud de fetch enviada');
    fetch('http://localhost:3000/api/pdf/InformeSituacionAcademica.pdf')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        window.open(url, '_blank', 'width=600,height=800');
      })
      .catch(error => console.error(error));
  };

  return (
    <button onClick={handleClick}>Mostrar PDF</button>
  );
}

export default PDFButton;