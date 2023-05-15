import React, {useState} from 'react';
import './Table.css';
import PDFModal from '../PDFModal/PDFModal.js'
import Modal from 'react-modal';
import { Button, ModalBody } from 'reactstrap';

const Table = ({theadData, tbodyData}) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alumno, setAlumno] = useState({RUN_Alumno: '', Nombres: '', Apellidos: '', Mail_UAI: '', Mail_Personal: ''});
  
  const closeModal  = () =>{
    setShowModal(false);
  }
  
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform:'translate (-50%, -50%)'
  }

  const funcClick = (row) => {
    fetch(`/api/pdf/${row.RUN_Alumno}.pdf`).then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setShowModal(true)
    }).catch(error => console.error(error));
    setAlumno({'RUN_Alumno': row.RUN_Alumno, 
                'Nombres': row.Nombres, 
                'Apellidos': row.Apellidos, 
                'Mail_UAI': row.Mail_UAI,
                'Mail_Personal': row.Mail_Personal})
  }

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
            return <tr key={index} onClick={() => funcClick(row)}>
              {theadData.map((key, index) => {
                return <td key={row[key]}>{row[key]}</td>
              })}
            </tr>;
          })}
        </tbody>
      </table>
      <Modal isOpen={showModal} style={modalStyles}>
        <ModalBody>
          <PDFModal pdfUrl={pdfUrl} Alumno={alumno}/>
          <Button className="listo-button" onClick={closeModal}>X</Button>
        </ModalBody>
      </Modal>
    </div>
    
  )
}

export default Table;