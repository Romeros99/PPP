import React, {useState, useEffect} from 'react';
import { Button, Form, Label, Input, Row,Col, ModalBody, Modal, ModalHeader, ModalFooter, Alert } from 'reactstrap';
import './FormPaso3.css';
import FuncionPaso from '../FuncionPaso/FuncionPaso';
import mailfunctions from './mailfunctions'; //se traen las funciones con html de mail desde mailfunctions

const FormPaso3 = ({setShowModal,showModal, datos, setDatos, mailAlumno}) => {
    const [showRechazo, setShowRechazo] = useState(false);
    const [visible, setVisible] = useState(false);
    //Almacena si se realizó o no algún cambio en los detalles de la empresa o del supervisor
    const [cambiosRealizados, setCambiosRealizados] = useState(false);
    const [respuestaSupervisor, setRespuestaSupervisor] = useState({ID_Respuesta: 0, RUN_Alumno: '', Tramitado: 0, Respuesta: null});
    const [respuestaCreada, setRespuestaCreada] = useState(false);

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
              RUN_Alumno: datos.RUN_Alumno, 
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
              const IDRespuesta = data.lastID;
              console.log('lastID: ', IDRespuesta);
              setRespuestaSupervisor(prevState => ({
                ...prevState,
                ID_Respuesta: IDRespuesta
              }));
              setRespuestaCreada(true);
              
              
            }
        } catch (error){
            alert('ERROR: Error en el intento de agregar el supervisor.')
        }
      };

      useEffect(() => {
        if (respuestaCreada) {
          // Realizar acciones adicionales después de que respuestaSupervisor haya sido actualizado
          console.log("respuesta supervisor: ", respuestaSupervisor);
          console.log('id:', respuestaSupervisor.ID_Respuesta);
          mailfunctions.sendMail_admin(
            datos.Mail,
            datos.RUN_Alumno,
            respuestaSupervisor.ID_Respuesta
          );
        }
      }, [respuestaSupervisor, respuestaCreada, datos.Mail]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //Se setea que se realizaron cambios
        setCambiosRealizados(true);
        //Se almacena como entero si es un numero de direccion y como string si es otro campo
        if (name === "Numero_Direccion"){
            setDatos(prevState => ({
                ...prevState,
                [name]: parseInt(value)
            }));
        }
        else{
            setDatos(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    
    //Post requests para hacer los updates de los detalles de la empresa, del supervisor y del detalle_pasantia
    const sendChangesAceptar = async () => {
        try {
            const res = await fetch('/api/bd/cambiar/empresa', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({...datos})
              
            });
            const data = await res.json();
      
            if (data.error) {
              alert(data.error);
            }
          } catch (error) {
            alert('ERROR: Error en la actualizacion de la empresa.');
        };
        try {
            const res = await fetch('/api/bd/cambiar/supervisor', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({...datos})
              
            });
            const data = await res.json();
      
            if (data.error) {
              alert(data.error);
            }
          } catch (error) {
            alert('ERROR: Error en la actualizacion del supervisor.');
        };
        try {
            const res = await fetch('/api/bd/cambiarDetalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                        RUN_Empresas : datos.RUN_Empresas,
                        ID_Supervisor : datos.ID_Supervisor,
                        RUN_Alumno : datos.RUN_Alumno
                    })
            });
            const data = await res.json();
            
            if (data.error) {
              alert(data.error);
            }
        } catch (error) {
            alert('ERROR: Error en la actualizacion del detalle de pasantía.');
        };
    };

    //Se realizan los cambios de update en la base de datos si se realizó algún cambio en la infomación de la empresa o del supervisor, por parte del administrador
    const handleAceptar = async () => {
        setShowModal(false);
        if (cambiosRealizados === true) {
          await sendChangesAceptar();
        }
    
        try {
          FuncionPaso(3.5, datos.RUN_Alumno);
        } catch (error) {
          alert('ERROR: Error en la actualización del paso.');
        }
    
        setCambiosRealizados(false);
        await crearRespuestaSupervisor();
        setShowModal(false);
        return;
      };

    const sendRemoveSupervisor = async() => {
        try {
            const res = await fetch('/api/bd/remove/supervisor', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({ID_Supervisor: datos.ID_Supervisor})
              
            });
            const data = await res.json();
      
            if (data.error) {
              alert(data.error);
            }
          } catch (error) {
            alert('ERROR: Error en la eliminación del supervisor.');
        };
        try {
            const res = await fetch('/api/bd/cambiarDetalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                        RUN_Empresas : 'NULL',
                        ID_Supervisor : 'NULL',
                        RUN_Alumno : datos.RUN_Alumno
                    })
            });
            const data = await res.json();
            
            if (data.error) {
              alert(data.error);
            }
        } catch (error) {
            alert('ERROR: Error en la actualizacion del detalle de pasantía.');
        };
        try {
            FuncionPaso(2.0, datos.RUN_Alumno);
        } catch (error) {
            alert('ERROR: Error en la actualizacion del paso.')
        };
    };

    const handleRechazar = () => {
        sendRemoveSupervisor();
        setShowRechazo(true);
        try {
            FuncionPaso(2.0, datos.RUN_Alumno);
        } catch (error) {
            alert('ERROR: Error en la actualizacion del paso.')
        };
        mailfunctions.sendMail_alumno(datos.Mail_Alumno);
        

    };

    const sendRemoveEmpresa = async() => {
        try {
            const res = await fetch('/api/bd/remove/empresa', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({RUN_Empresas: datos.RUN_Empresa_Inicial})
              
            });
            const data = await res.json();
      
            if (data.error) {
              alert(data.error);
            }
          } catch (error) {
            alert('ERROR: Error en la eliminación del supervisor.');
        };
    };
    

    const handleBorrar = () =>{
        sendRemoveEmpresa();
        setShowRechazo(false);
        setShowModal(false);
        setVisible(true);
    };

    const handleMantener = () =>{
        setShowRechazo(false);
        setShowModal(false);
        setVisible(true);
    };

    return(
        <div>
        <div>
            <Alert color="success" isOpen={visible} toggle={() => setVisible(false)} style = {{position: 'absolute', top: 70, left: 50, right: 50 }}>
            La empresa y supervisor se ha borrado exitosamente
            </Alert>
        </div>
        <div>
        <Modal isOpen={showModal} >
            <ModalHeader toggle = {() => setShowModal(false)}> Datos Empresa</ModalHeader>
        <ModalBody>
                <Form >
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <Label
                                for="Nombre"
                            >
                                Nombre Empresa
                            </Label>
                            <Input
                                id="Nombre"
                                name="Nombre"
                                type="text"
                                value = {datos.Nombre}
                                onChange = {handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="RUN_Empresa"
                            >
                                Rut Empresa
                            </Label>
                            <Input
                                id="RUN_Empresas"
                                name="RUN_Empresas"
                                type="text"
                                value = {datos.RUN_Empresas}
                                onChange = {handleInputChange}
                                placeholder='XX.XXX.XXX-X'
                            />
                        </Col>
                    </Row>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <Label
                                for="Ciudad_Direccion"
                            >
                                Ciudad
                            </Label>
                            <Input
                                id="Ciudad_Direccion"
                                name="Ciudad_Direccion"
                                type="text"
                                value = {datos.Ciudad_Direccion}
                                onChange = {handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="Comuna_Direccion"
                            >
                                Comuna
                            </Label>
                            <Input
                                id="Comuna_Direccion"
                                name="Comuna_Direccion"
                                type="text"
                                value = {datos.Comuna_Direccion}
                                onChange = {handleInputChange}
                            />
                        </Col>   
                    </Row>
                    <Row className="row-cols-lg-auto g-3 align-items-center"> 
                        <Col>
                            <Label
                                for="Calle_Direccion"
                            >
                                Calle
                            </Label>
                            <Input
                                id="Calle_Direccion"
                                name="Calle_Direccion"
                                type="text"
                                value = {datos.Calle_Direccion}
                                onChange = {handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="Numero_Direccion"
                            >
                                Numero de calle
                            </Label>
                            <Input
                                id="Numero_Direccion"
                                name="Numero_Direccion"
                                type="number"
                                value = {datos.Numero_Direccion}
                                onChange = {handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Label
                                for="Rubro"
                            >
                                Rubro
                            </Label>
                            <Input
                                id="Rubro"
                                name="Rubro"
                                type="text"
                                value = {datos.Rubro}
                                onChange = {handleInputChange}
                            />
                        </Col>
                    </Row>
                    </Form>
                    </ModalBody>
                    <ModalHeader> Datos Supervisor</ModalHeader>
                    <ModalBody>
                    <Form>
                    <Row className="row-cols-lg-auto g-3 align-items-center"> 
                        <Col>
                            <Label
                                for="Nombres"
                            >
                                Nombre completo
                            </Label>
                            <Input
                                id="Nombres"
                                name="Nombres"
                                type="text"
                                value = {datos.Nombres}
                                onChange = {handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="Apellidos"
                            >
                                Apellidos
                            </Label>
                            <Input
                                id="Apellidos"
                                name="Apellidos"
                                type="text"
                                value = {datos.Apellidos}
                                onChange = {handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Label
                                for="Mail"
                            >
                                email
                            </Label>
                            <Input
                                id="Mail"
                                name="Mail"
                                type="text"
                                value = {datos.Mail}
                                onChange = {handleInputChange}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Button className='accept-button margin-left' onClick = {() => handleAceptar()}>Confirmar</Button>
                    <Button className='margin-left' color = 'danger' onClick = {() => handleRechazar()}>Rechazar</Button>
                </Form>
            </ModalBody>
            </Modal>
            
      </div>
        <Modal isOpen={showRechazo}>
                <ModalHeader closeButton={true} toggle = {() => setShowRechazo(false)}>
                    <span>Confirmación</span>
                </ModalHeader>
                <ModalBody>
                    <p>¿Desea eliminar la empresa de la base de datos?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleMantener()}>Mantener</Button>
                    <Button color="danger" onClick={() => handleBorrar()}>Borrar</Button>
                </ModalFooter>
            </Modal>
      </div>
    )

    } 
export default FormPaso3;