import React, {useState} from 'react';
import { Button, Form, Label, Input, Row,Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FuncionPaso from '../FuncionPaso/FuncionPaso';

const FormSupervisor = ({setShowButton, setShowForm, setShowFormSupervisor, showFormSupervisor, empresa, Paso, RUN}) => {
    console.log(empresa)
    const [supervisor, setSupervisor] = useState({ID_Supervisor: '', RUN_Empresas: '', Nombres: '', Apellidos: '', Mail: ''});
    const [showModal, setShowModal] = useState(false);
    

    const handleGoBackSup = () =>{
        setShowButton(true);
        setShowForm(true);
        setShowFormSupervisor(false);
    }

    const handleFormularios = () => {
        Paso = Paso + 0.5;
        FuncionPaso(Paso, RUN);
        setShowForm(false)
        setShowButton(false)
        setTimeout(() => {
            window.location.href = '/alumno';
          }, 500);
      }
    
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
          setSupervisor(prevState => ({
            ...prevState,
            [name]: value
          }))
    }
    const entregarDataSupervisor = async () => {
        try {
            const respuesta = await fetch('/api/bd/crear/supervisor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({   
                ID_Supervisor: supervisor.ID_Supervisor,
                RUN_Empresas: empresa.RUN_Empresas, 
                Nombres: supervisor.Nombres, 
                Apellidos: supervisor.Apellidos,
                Mail: supervisor.Mail
                })
            })
            const data = await respuesta.json();
            setShowModal(false);
            handleFormularios();
            if (data.error) {
              alert(data.error);
            }
            else{
            }
        } catch (error){
            alert('ERROR: Error en el intento de agregar el supervisor.')
        }
    };
    
    return(
        <div >
            {showFormSupervisor && (
            
            <div>
                <div>   
                <Form>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                        <Label for="Nombres">Nombre Supervisor</Label>
                        <Input id="Nombres" name="Nombres" type="text" onChange={handleInputChange} />
                        </Col>
                        <Col>
                        <Label for="Apellidos">Apellidos Supervisor</Label>
                        <Input id="Apellidos" name="Apellidos" type="text" onChange={handleInputChange} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        <Label for="Mail">Mail Supervisor</Label>
                        <Input id="Mail" name="Mail" type="email" onChange={handleInputChange}/>
                        </Col>
                    </Row>

                    <br />
                    <Button className="accept-button margin-left" onClick={() => setShowModal(true)}>
                        Confirmar
                    </Button>
                    <Button onClick={() => handleGoBackSup()}>Volver</Button>
                </Form>
                </div>
            </div>
            )}
        <Modal isOpen={showModal}>
            <ModalHeader closeButton = {'true'}>Confirmación
                </ModalHeader>
                <ModalBody>
                <p>¿Estás seguro de querer envíar el supervisor a la administración de la universidad?</p>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={entregarDataSupervisor}>
                    Enviar
                </Button>
                <Button color="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
            </ModalFooter>
      </Modal>
      
    </div>
    )
}   

export default FormSupervisor;