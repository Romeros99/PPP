import './HomePageAlumno.css';
import { useState } from 'react';


function HomePageAlumno() {
  //Estado para controlar si se ha aceptado el reglamento
  const [aceptado, setAceptado] = useState(false);
  const [alumno, setAlumno] = useState({RUN_Alumno: '', Nombres: '', Apellidos: '', Mail_UAI: '', Mail_Personal: ''});
  const [reglamento, setReglamento] = useState({RUN_Alumno: '', Nombres: '', Apellidos: '', Mail_UAI: '', Mail_Personal: ''});
  

  const setInput = (e) => {
    const {name, value} = e.target;
    setAlumno(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const entregarDataAlumno = async () => {
    try {
      const respuesta = await fetch('/api/bd/crear/alumno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          RUN_Alumno: alumno.RUN_Alumno,
          Nombres: alumno.Nombres,
          Apellidos: alumno.Apellidos,
          Mail_UAI: alumno.Mail_UAI,
          Mail_Personal: alumno.Mail_Personal
        })
      })
      const data = await respuesta.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert('Alumno creado exitosamente!')
      }
    } catch (error){
      alert('ERROR: Error en el intento de creación de alumno.')
    }
  };

  //return (
  //  <div className="App">
  //    <input name = 'RUN_Alumno' placeholder = 'RUT [XX.XXX.XXX-X]' onChange = {setInput}></input>
  //    <input name = 'Nombres' placeholder = 'Nombres' onChange = {setInput}></input>
  //    <input name = 'Apellidos' placeholder = 'Apellidos' onChange = {setInput}></input>
  //   <input name = 'Mail_UAI' placeholder = 'Mail UAI' onChange = {setInput}></input>
  //    <input name = 'Mail_Personal' placeholder = 'Mail Personal' onChange = {setInput}></input>
  //    <button onClick = {() => entregarData()}>Click</button>
  //    <button onClick = {() => entregarData()}>Crear</button>
  //  </div>
  //);

  // Si no se ha aceptado el reglamento, se muestra el botón de aceptar
  if (!aceptado) {
    return (
      <div className="center">
        <h1>Confirmación de reglamento</h1>
        <object data="./DECRETO ACADEMICO REGLAMENTO FIC PRACTICA.pdf" width="500" height="375" type='application/pdf'></object>
        <div className='botones'>
          <button onClick={() => setAceptado(true)}>Aceptar</button>
          <button>Rechazar</button>
        </div>
      </div>
    );
  }

  // Si se ha aceptado el reglamento, se muestra el formulario
  return (
    <div className="center">
      <h1>Confirmación de reglamento</h1>
      <object data="./DECRETO ACADEMICO REGLAMENTO FIC PRACTICA.pdf" width="500" height="375" type='application/pdf'></object>
      <div>
        <p>Ingrese sus datos: </p>
        <input name = 'RUN_Alumno' placeholder = 'RUT [XX.XXX.XXX-X]' onChange = {setInput}></input>
        <input name = 'Nombres' placeholder = 'Nombres' onChange = {setInput}></input>
        <input name = 'Apellidos' placeholder = 'Apellidos' onChange = {setInput}></input>
        <input name = 'Mail_UAI' placeholder = 'Mail UAI' onChange = {setInput}></input>
        <input name = 'Mail_Personal' placeholder = 'Mail Personal' onChange = {setInput}></input>
        <button onClick = {() => entregarDataAlumno()}>Confirmar</button>
        <button onClick={() => setAceptado(false)}>Cancelar</button>
      </div>
    </div>
  );
};

export default HomePageAlumno;