import './HomePageAdmin.css';
import React, { useState, useEffect} from 'react';
import Table from '../../Table/Table.js'
import TablePaso3 from '../../TablePaso3/TablePaso3.js'
import FormPaso3 from '../../FormPaso3/FormPaso3';
import { Button } from 'reactstrap';

function HomePageAdmin() {
  //Se utiliza useState para almacenar en un array los alumnos que están en estado pendiente
  const [returnedRUNs, setReturnedRUNs] = useState([]);
  const [returnedData, setReturnedData] = useState(['']);
  //Las variables active y active2, activan las tablas que se abren y cierran al presionar los botones de Buscar Alumnos Pendientes o Buscar Pasantías Pendientes, respectivamente
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [showForm, setShowForm] = useState(false);
  //ReturnedDataPasantia y datos almacenan el arreglo de pasantias pendientes y los datos de la fila seleccionada por el administrador, respectivamente
  const [returnedDataPasantias, setReturnedDataPasantias] = useState([])
  const [datos, setDatos] = useState({})

  useEffect(() => {
    fetchRUNs();

  }, []);
  
  useEffect(() => {}, [returnedData]);


  //obtiene nombres de las columnas de table.js
  const getHeadings = (returnedData) => {
    return Object.keys(returnedData[0]);
  }

  //Función que conecta con el API para obtener los RUNs de alumnos en estado pendiente mediante un GET Request.
  const fetchRUNs = async () => {
    const newData = await fetch('/api/bd/pendientes/RUNs', {
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

  //Función ejecutada al apretar el botón de buscar alumnos pendientes que consigue los RUNs y, en caso de haber más de uno, activa la vista de la tabla y busca los datos de los alumnos
  const funcFetchData = () => {
    fetchRUNs();
    if(returnedRUNs.length === 0){
      setActive(false);
    }else{
      fetchData();
      setActive(!active);
    }  
  }

  //Función que conecta con Backend para obtener la información de Pasantías en estado pendiente mediante un GET Request.
  const fetchDataPasantias = async () => {
    try {
      const res = await fetch('/api/bd/pendientes/pasantias', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        
      const data = await res.json();
      
      if (data.error) {
        alert(data.error);
      } else {
      //Se almacenan toda la información de las pasantías retornados (json) en un returnedDataPasantias 
        setReturnedDataPasantias([...data]);
      }
    } catch (error){
      alert('ERROR: Error en la búsqueda de pasantías pendientes.')
    }
  };

  //Función encargada de obtener los datos de las pasantías pendientes (RUN Alumno, Info de Pasantías e Info de Supervisor)
  const funcFetchDataPasantias = () => {
    fetchDataPasantias();
    if(returnedDataPasantias.length === 0){
      setActive2(false);
    }else{
      setActive2(!active2);
    }
  }

  return (
    <div>
      <div className = 'App'>
        <Button onClick = {() => funcFetchData()} style={{ backgroundColor: active ? '#0091ff' : '#6c757d' }}>{active ? 'Cerrar Tabla de Alumnos': 'Buscar Alumnos Pendientes'}</Button>
        {active && <Table theadData = {getHeadings(returnedData)} tbodyData = {returnedData}/>}
        <br></br>
        <Button onClick = {() => funcFetchDataPasantias()} style={{ backgroundColor: active2 ? '#0091ff' : '#6c757d' }}>{active2 ? 'Cerrar Tabla de Pasantías': 'Buscar Pasantías Pendientes'}</Button>
        {active2 && <TablePaso3 theadData = {getHeadings(returnedDataPasantias)} tbodyData = {returnedDataPasantias} setDatos = {setDatos} setShowForm = {setShowForm}/>}
        <br></br>
        <FormPaso3 setShowModal = {setShowForm} showModal = {showForm} datos = {datos} setDatos = {setDatos}></FormPaso3>
      </div>
    </div>
  )
}

export default HomePageAdmin;