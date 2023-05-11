import './App.css';
import React, { useState } from 'react';
import Table from './Table/Table.js'

function App() {

  const [returnedData, setReturnedData] = useState(['']);
  //const [alumno, setAlumno] = useState({RUN_Alumno: '', Nombres: '', Apellidos: '', Mail_UAI: '', Mail_Personal: ''});

  //const setInput = (e) => {
  //  const {name, value} = e.target;
  //  setAlumno(prevState => ({
  //    ...prevState,
  //    [name]: value
  //  }));
  //}

  const fetchData = async () => {
    const newData = await fetch('/api/bd/pendientes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      //body: JSON.stringify({
      //  rut: alumno.RUN_Alumno
      //})
    })
    .then(res => res.json());
    setReturnedData([...newData]);
  }

  //const fetchData = async () => {
  //  const newData = await fetch('/api', {
  //    method: 'GET',
  //    headers: {
  //      'Content-Type': 'application/json',
  //      'Accept': 'application/json'
  //    },
  //    body: JSON.stringify({
  //      RUN_Alumno: alumno.RUN_Alumno
  //      Nombres: alumno.Nombres
  //      Apellidos: alumno.Apellidos
  //      Mail_UAI: alumno.Mail_UAI
  //      Mail_Personal: alumno.Mail_Personal
  //    })
  //  })
  //  .then(res => res.json());
  //  setReturnedData([...newData]);
  //}

  console.log("Returned Data");
  console.log(returnedData);
  const getHeadings = (returnedData) => {
    return Object.keys(returnedData[0]);
  }

  console.log(getHeadings(returnedData));

  return (
    <div className = 'App'>
      <button onClick = {() => fetchData()}>Buscar Alumnos Pendientes</button>
      <Table theadData = {getHeadings(returnedData)} tbodyData = {returnedData}/>
    </div>
  )

  //return (
  //  <div className="App">
  //    <input name = 'RUN_Alumno' placeholder = 'RUT [XX.XXX.XXX-X]' onChange = {setInput}></input>
  //    <input name = 'Nombres' placeholder = 'Nombres' onChange = {setInput}></input>
  //    <input name = 'Apellidos' placeholder = 'Apellidos' onChange = {setInput}></input>
  //    <input name = 'Mail_UAI' placeholder = 'Mail UAI' onChange = {setInput}></input>
  //    <input name = 'Mail_Personal' placeholder = 'Mail Personal' onChange = {setInput}></input>
  //    <button onClick = {() => fetchData()}>Click</button>
  //    <button onClick = {() => fetchData()}>Crear</button>
  //    <p>RUT Alumno: {returnedData.RUN_Alumno}</p>
  //    <p>Nombres: {returnedData.Nombres}</p>
  //    <p>Apellidos: {returnedData.Apellidos}</p>
  //    <p>Mail UAI: {returnedData.Mail_UAI}</p>
  //    <p>Mail Personal: {returnedData.Mail_Personal}</p>
  //  </div>
  //);
}

export default App;
