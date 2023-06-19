import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Alert from '@mui/material/Alert';
import './FormProyecto.css';
import FuncionPaso from '../FuncionPaso/FuncionPaso';

const FormProyecto = ({RUN_Alumno}) => {
  const [titulo, setTitulo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [horasSemanales, setHorasSemanales] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleHorasSemanalesChange = (event) => {
    setHorasSemanales(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  //Función en donde se envían los datos ingresados por el alumno para que se agreguen a su detalle de pasantía.
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/bd/cambiar/proyecto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Titulo : titulo,
          Descripcion : descripcion,
          FechaInicio: fechaInicio,
          HorasSemanales : horasSemanales,
          RUN_Alumno : RUN_Alumno
        })
      });
      const data = await res.json();

      if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      return <Alert severity="error">ERROR: Error en la actualización de la pasantía.</Alert>;
    };
    //Se cambia el paso a 5.5
    FuncionPaso(5.5, RUN_Alumno);
    setEnviado(true);
  };

  return (
    <div className="formulario-container">
      <h2 className="formulario-titulo">Inscribir Proyecto de Pasantía</h2>
      {!enviado ? (
        <Form onSubmit={handleSubmit} className="formulario">
          <FormGroup>
            <Label for="titulo">Título del Proyecto:</Label>
            <Input
              type="text"
              id="titulo"
              value={titulo}
              onChange={handleTituloChange}
              maxLength={64}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="fechaInicio">Fecha de Inicio de la Pasantía:</Label>
            <Input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="horasSemanales">Horas Semanales:</Label>
            <Input
              type="select"
              id="horasSemanales"
              value={horasSemanales}
              onChange={handleHorasSemanalesChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="descripcion">Descripción del Proyecto:</Label>
            <Input
              type="textarea"
              id="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange}
              maxLength={120}
              rows={5}
              required
            />
          </FormGroup>
          <Button className="enviar" type="submit">
            Enviar
          </Button>
        </Form>
      ) : (
        <Alert severity="success">Datos Enviados</Alert>
      )}
    </div>
  );
};

export default FormProyecto;


