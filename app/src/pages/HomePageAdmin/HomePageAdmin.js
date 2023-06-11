import './HomePageAdmin.css';
import React, { useState, useEffect} from 'react';
import Table from '../../Table/Table.js'
import { Button } from 'reactstrap';
import FormPaso3 from '../../FormPaso3/FormPaso3';

function HomePageAdmin() {
  //Se utiliza useState para almacenar en un array los alumnos que están en estado pendiente
  const [returnedRUNs, setReturnedRUNs] = useState(['']);
  const [returnedData, setReturnedData] = useState(['']);
  const [active, setActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [datos, setDatos] = useState({RUN_Alumno: '20.358.429-6', RUN_Empresas: '90.286.000-2', Nombre: 'Brititsh American Tobacco Chile Operaciones S.A.',
    Calle_Direccion: 'Fundo La Rotunda Ruta 68', Numero_Direccion: 0, Comuna_Direccion: 'Casablanca',
    Ciudad_Direccion: 'Casablanca', Rubro: 'Industrias Manufactureras de Tabaco',Nombres: 'Alejandro', Apellidos: 'Romero', Mail: 'aleromeros1999@gmail.com'})
  const [respuestaSupervisor, setRespuestaSupervisor] = useState({ID_Respuesta: '', RUN_Alumno: '20.358.429-6', Tramitado: 0, Respuesta: null});
  const [showBoton, setShowBoton] = useState(false);
  const [idRespuestaSupervisor, setidRespuestaSupervisor] = useState(0);
  useEffect(() => {
    fetchRUNs();
  }, []);
  
  useEffect(() => {}, [returnedData]);


  const crearRespuestaSupervisor = async () => {
    try {
        const respuesta = await fetch('/api/bd/crear/respuestaSupervisor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({   
          ID_Respuesta: respuestaSupervisor.ID_Respuesta,
          RUN_Alumno: respuestaSupervisor.RUN_Alumno, 
          Tramitado: respuestaSupervisor.Tramitado, 
          Respuesta: respuestaSupervisor.Respuesta
            })
        })
        const data = await respuesta.json();
        console.log("respuesta data: ", JSON.stringify(data));
        if (data.error) {
          alert(data.error);
        }
        else{
          const idRespuestaSupervisor = data.lastID;
          setidRespuestaSupervisor(idRespuestaSupervisor);
          console.log('ID supervisor: ', idRespuestaSupervisor);
          setShowBoton(true);
        }
    } catch (error){
        alert('ERROR: Error en el intento de agregar el supervisor.')
    }
};


  //obtiene nombres de las columnas de table.js
  const getHeadings = (returnedData) => {
    return Object.keys(returnedData[0]);
  }

  //Función que conecta con el API para obtener los RUNs de alumnos en estado pendiente mediante un GET Request.
  const fetchRUNs = async () => {
    const newData = await fetch('/api/bd/pendientes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json());
    //Se almacenan todos los RUNs retornados (json) en un returnedRUNs 
    setReturnedRUNs([...newData]);
  }

  //Función que conecta con Omega para obtener la información de alumnos en estado pendiente mediante un GET Request.
  const fetchData = async () => {
    try {
      const res = await fetch('/omega/bd/pendientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify( [ ...returnedRUNs ] )
      })
        
      const data = await res.json();
      
      if (data.error) {
        alert(data.error);
      } else {
      //Se almacenan toda la información de los alumnos retornados (json) en un returnedData 
        setReturnedData([...data]);
      }
    } catch (error){
      alert('ERROR: Error en la búsqueda de alumnos pendientes.')
    }
  };

  const funcFetchData = () => {
    fetchRUNs();
    if(returnedRUNs.length >= 1){
      setActive(true);
      fetchData();
    }else{
      setActive(false);
    }
    
  }

  function MyButton({ idRespuestaSupervisor }) {
    const handleClick = () => {
      const url = `/aceptar/${idRespuestaSupervisor}`;
      window.open(url);
    };
    return (
      <button onClick={handleClick}>Aceptar (supervisor acepta en mail)</button>
    );
  }
  function MyButtonRechazar({ idRespuestaSupervisor }) {
    const handleClick = () => {
      const url = `/rechazo/${idRespuestaSupervisor}`;
      window.open(url);
    };
    return (
      <button onClick={handleClick}>Rechazar (supervisor rechaza en mail)</button>
    );
  }
  return (
    <div>
    <div className = 'App'>
      <Button onClick = {() => funcFetchData()}>Buscar Alumnos Pendientes</Button>
      {active && <Table theadData = {getHeadings(returnedData)} tbodyData = {returnedData}/>}
      <br></br>
      <Button onClick = {() => setShowForm(true)}>Mostrar (dummy de tabla)</Button>
      <br></br>
      <FormPaso3 setShowModal = {setShowForm} showModal = {showForm} datos={datos} setDatos = {setDatos}></FormPaso3>
      <button onClick={crearRespuestaSupervisor}>abrir (dummy de enviar mail)</button>
      {showBoton && (
      <div>
      <br></br>
      <MyButton idRespuestaSupervisor = {idRespuestaSupervisor}></MyButton>
      <MyButtonRechazar idRespuestaSupervisor = {idRespuestaSupervisor}></MyButtonRechazar>
      </div>)}
    </div>
    </div>
  )
}

export default HomePageAdmin;
