import './HomePageAdmin.css';
import React, { useState } from 'react';
import Table from '../../Table/Table.js'
import { Button, ModalBody } from 'reactstrap';

function HomePageAdmin() {
  //Se utiliza useState para almacenar en un array los alumnos que están en estado pendiente
  const [returnedData, setReturnedData] = useState(['']);
  
  //Función que conecta con el API para obtener los alumnos en estado pendiente mediante un GET Request.
  const fetchData = async () => {
    const newData = await fetch('/api/bd/pendientes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json());
    //Se almacenan todos los alumnos retornados (json) en un returnedData 
    setReturnedData([...newData]);
  }

  //obtiene nombres de las columnas de table.js
  const getHeadings = (returnedData) => {
    return Object.keys(returnedData[0]);
  }

  return (
    <div className = 'App'>
      <Button onClick = {() => fetchData()}>Buscar Alumnos Pendientes</Button>
      <Table theadData = {getHeadings(returnedData)} tbodyData = {returnedData}/>
    </div>
  )
}

export default HomePageAdmin;
