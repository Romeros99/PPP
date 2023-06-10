import './HomePageAdmin.css';
import React, { useState, useEffect } from 'react';
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
    console.log(returnedRUNs.length);
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

  return (
    <div>
    <div className = 'App'>
      <Button onClick = {() => funcFetchData()}>Buscar Alumnos Pendientes</Button>
      {active && <Table theadData = {getHeadings(returnedData)} tbodyData = {returnedData}/>}
      <Button onClick = {() => setShowForm(true)}>Mostrar</Button>
      <FormPaso3 setShowModal = {setShowForm} showModal = {showForm} datos={datos} setDatos = {setDatos}></FormPaso3>
    </div>
    </div>
  )
}

export default HomePageAdmin;
