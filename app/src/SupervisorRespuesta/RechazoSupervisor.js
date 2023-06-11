import React, {useLayoutEffect} from 'react';
import { useParams} from 'react-router-dom';
import logo from './logo_uai.png';

const RespuestaSupervisor = ({setShowNavBar}) => {
    setShowNavBar(false)
    const { ID_Respuesta } = useParams();

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

      useLayoutEffect(() => {
      FuncionAceptarRespuesta(ID_Respuesta);
      
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