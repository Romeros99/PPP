import React, { useState } from 'react';
import PdfModal from './PdfModal';

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleClick = () => {
    fetch('http://localhost:4000/api/pdf/InformeSituacionAcademica.pdf')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      })
      .catch(error => console.error(error));
  };

  const tablaData = [
    { id: 1, name: "Documento 1", pdf: "InformeSituacionAcademica.pdf" },
    { id: 2, name: "Documento 2", pdf: "InformeSituacionAcademica.pdf" },
    { id: 3, name: "Documento 3", pdf: "InformeSituacionAcademica.pdf" },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {tablaData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => {
                    console.log(item.pdf);
                    fetch(`http://localhost:4000/api/pdf/${item.pdf}`)
                      .then(response => response.blob())
                      .then(blob => {
                        const url = URL.createObjectURL(blob);
                        setPdfUrl(url);
                      })
                      .catch(error => console.error(error));
                }}>
                  Abrir PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PdfModal pdfUrl={pdfUrl} />
    </div>
  );
}

export default App;
