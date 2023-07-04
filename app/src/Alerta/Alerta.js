import React, { useState } from 'react';
import { Alert, Container, Row } from 'reactstrap';

const Alerta = ({ mensaje, tipo, showAlert, setShowAlert}) => {
  
const onDismiss = () => {
    setShowAlert(false);
  };

  return (
    <Container>
      <br></br>
      <Row>
        <Alert color={tipo} isOpen={showAlert} toggle={onDismiss}>
        {mensaje}
        </Alert>
      </Row>
    </Container>
  );
};

export default Alerta;