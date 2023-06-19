import React, {useLayoutEffect} from 'react';
import { useParams} from 'react-router-dom';
import logo from './logo_uai.png';
import {sendMail_supervisor_rechaza} from '../FormPaso3/mailfunctions';

const RespuestaSupervisor = ({setShowNavBar}) => {
    setShowNavBar(false)
    const { ID_Respuesta } = useParams();
// Obtiene el correo electrónico del alumno a partir de su RUN
    const getMailAlumno = async (RUN) => {
      try {
        const response = await fetch(`/omega/bd/get/mail_alumno?RUN=${RUN}`);
    
        if (!response.ok) {
          throw new Error('Error en la búsqueda del mail del Alumno');
        }
        const data = await response.json();
        const mailAlumno = data.mail_Alumno;
        sendMail_supervisor_rechaza(mailAlumno);
      } catch (error) {
        console.error('Error:', error);
      }
  }
// Obtiene el RUN del alumno a partir del ID de respuesta
    const fetchRunAlumno = async (ID_Respuesta) => {
      try {
        const response = await fetch(`/api/bd/respuesta/RUN?ID_Respuesta=${ID_Respuesta}`);
    
        if (!response.ok) {
          throw new Error('Error en la búsqueda del mail del Alumno');
        }
        const data = await response.json();
        const run_Alumno = data.run_Alumno;
        getMailAlumno(run_Alumno);

      } catch (error) {
        console.error('Error:', error);
      }
  }
  // Rechaza la respuesta del supervisor
    const FuncionAceptarRespuesta = async (ID_Respuesta) => {
      try {
        console.log('ID Supervisor: ', ID_Respuesta);
        const res = await fetch('/api/bd/rechazar/respuestaSupervisor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ ID_Respuesta})         
        })

      } catch (error) {
        alert(error.message); // Mostrar el mensaje de error personalizado
      }
    };
// Realiza las acciones necesarias al cargar el componente
      useLayoutEffect(() => {
      FuncionAceptarRespuesta(ID_Respuesta);
      fetchRunAlumno(ID_Respuesta);
      
      }, [])


      return (
        <div style={styles.container}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h1 style={styles.heading}>Estimado supervisor/a</h1>
          <p style={styles.paragraph}>La respuesta se ha enviado a la Universidad, muchas gracias por su tiempo.</p>
        </div>
      );
    };
    
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      },
      logo: {
        width: '150px', // Ajusta el tamaño del logo según tus necesidades
        marginBottom: '1rem',
      },
      heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
      },
      paragraph: {
        fontSize: '1.5rem',
        color: '#555',
      },
    };

export default RespuestaSupervisor;