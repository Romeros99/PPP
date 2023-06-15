import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Alert from '@mui/material/Alert';
import './FormProyecto.css';

const FormularioPasantia = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Mostrar ventana de confirmación antes de enviar el formulario
    if (window.confirm('¿Estás seguro de que deseas enviar el formulario?')) {
      // Aquí puedes realizar cualquier lógica adicional con los datos del formulario
      // Por ejemplo, enviar los datos al servidor o realizar validaciones
      console.log('Datos del formulario:', {
        titulo,
        fechaInicio,
        horasSemanales,
        descripcion,
      });

      setEnviado(true);
    }
  };

  return (
    <div className="formulario-container">
      <h2 className="formulario-titulo">Inscribir Proyecto de Pasantía</h2>
      {!enviado ? (
        <Form onSubmit={handleSubmit} className="formulario">
          <FormGroup>
            <Label for="titulo">Título del proyecto:</Label>
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
            <Label for="fechaInicio">Fecha de inicio de la pasantía:</Label>
            <Input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="horasSemanales">Horas semanales:</Label>
            <Input
              type="select"
              id="horasSemanales"
              value={horasSemanales}
              onChange={handleHorasSemanalesChange}
              required
            >
              <option value="">Seleccionar</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="descripcion">Descripción del proyecto:</Label>
            <Input
              type="textarea"
              id="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange}
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

export default FormularioPasantia;


