import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfModal from './PdfModal';

function TablaPdf() {
  const [data, setData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/data');
      setData(result.data);
    };
    fetchData();
  }, []);

  const handlePdfClick = (pdfName) => {
    fetch(`http://localhost:3000/api/pdf/${pdfName}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      })
      .catch(error => console.error(error));
  };

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
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handlePdfClick(item.pdf)}>
                  Abrir PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PdfModal pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} />
    </div>
  );
}

export default TablaPdf;
