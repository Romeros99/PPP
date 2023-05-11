import React, {useState} from 'react';
import './Table.css';
import PDFModal from '../PDFModal/PDFModal.js'

const Table = ({theadData, tbodyData}) => {

  const [pdfUrl, setPdfUrl] = useState(null);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {theadData.map(heading => {
            return <th key={heading}>{heading}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {tbodyData.map((row, index) => {
            return <tr key={index} onClick={() => {
              fetch(`/api/pdf/${row.RUN_Alumno}.pdf`).then(response => response.blob())
              .then(blob => {
                  const url = URL.createObjectURL(blob);
                  setPdfUrl(url);
                }).catch(error => console.error(error));
              }}>
              {theadData.map((key, index) => {
                return <td key={row[key]}>{row[key]}</td>
              })}
            </tr>;
          })}
        </tbody>
      </table>
      <PDFModal pdfUrl={pdfUrl} />
    </div>
    
  )
}

export default Table;