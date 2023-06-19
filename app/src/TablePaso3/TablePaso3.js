//importacion de librerias
import React, {useState} from 'react';
import './TablePaso3.css';

//crea un tabla con las filas de la base de dato y largo dinamico segun los registros de alumnos
const TablePaso3 = ({theadData, tbodyData, setDatos, setShowForm}) => {
    const [mail_Alumno, setMail_Alumno] = useState();

    const getMailAlumno = async (RUN) => {
      try {
        const response = await fetch(`/omega/bd/get/mail_alumno?RUN=${RUN}`);
    
        if (!response.ok) {
          throw new Error('Error en la búsqueda del mail del Alumno');
        }
        const data = await response.json();
        const mailAlumno = data.mail_Alumno;
        console.log(mailAlumno);
        //Setter del CurrentStep
        setMail_Alumno(mailAlumno);
        //console.log("step:", step)
      } catch (error) {
        console.error('Error:', error);
      }
  }
  //Al apretar la fila de la pasantía, guarda los datos en la variable datos de HomePageAlumno
  const funcClick = (row) => {
    getMailAlumno(row.RUN_Alumno);
    setDatos({'RUN_Empresa_Inicial': row.RUN_Empresas,
              'ID_Supervisor': row.ID_Supervisor,
              'RUN_Alumno': row.RUN_Alumno,
              'RUN_Empresas': row.RUN_Empresas, 
              'Nombre': row.Nombre, 
              'Calle_Direccion': row.Calle_Direccion,
              'Numero_Direccion': row.Numero_Direccion,
              'Comuna_Direccion': row.Comuna_Direccion,
              'Ciudad_Direccion': row.Ciudad_Direccion,
              'Rubro': row.Rubro,
              'Nombres': row.Nombres,
              'Apellidos': row.Apellidos,
              'Mail': row.Mail,
              'Mail_Alumno': mail_Alumno
              });
    //Activa el despliegue del formulario con la información de la pasantía
    setShowForm(true);
  }
  //Despliega la tabla
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {theadData.map(heading => {
            //No se muestra el ID_Supervisor en la tabla
            if (heading !== 'ID_Supervisor'){
              return <th key={heading}>{heading}</th>
            }
            })}
          </tr>
        </thead>
        <tbody>
          {tbodyData.map((row, index) => {
            return <tr key={index} onClick={() => funcClick(row)}>
              {theadData.map((key, index) => {
                //No se muestra el ID_Supervisor en la tabla
                if (key !== 'ID_Supervisor'){
                  return <td key={row[key]}>{row[key]}</td>
                }
              })}
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TablePaso3;