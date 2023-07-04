import React, {useState} from 'react';
import { Button, Form, Label, Input, Row,Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FuncionPaso from '../FuncionPaso/FuncionPaso';
import Alerta from '../Alerta/Alerta.js';

const FormSupervisor = ({setShowButton, setShowForm, setShowFormSupervisor, showFormSupervisor, empresa, Paso, RUN}) => {
    const [supervisor, setSupervisor] = useState({ID_Supervisor: '', RUN_Empresas: '', Nombres: '', Apellidos: '', Mail: ''});
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTipo, setAlertTipo] = useState('');

    // Maneja el evento de retroceder en el formulario del supervisor
    const handleGoBackSup = () =>{
        setShowButton(true);
        setShowForm(true);
        setShowFormSupervisor(false);
    }
    // Maneja el evento de enviar los formularios
    const handleFormularios = () => {
        Paso = Paso + 0.5;
        FuncionPaso(Paso, RUN);
        setShowForm(false)
        setShowButton(false)
        setTimeout(() => {
            window.location.href = '/alumno';
          }, 500);
      }
    // Maneja el cambio en los campos de entrada del formulario
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
          setSupervisor(prevState => ({
            ...prevState,
            [name]: value
          }))
    }
    // Envía los datos del supervisor al servidor
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
            console.log("respuesta data: ", JSON.stringify(data));
            if (data.error) {
              //alert(data.error);
              setShowAlert(true);
              setAlertMessage(data.error);
              setAlertTipo('danger');
            }
            else{
              setShowModal(false);

              const idSupervisor = data.lastID;
              console.log('ID supervisor: ', idSupervisor);
              FuncionDetalle(empresa.RUN_Empresas, idSupervisor, RUN);
              handleFormularios();
            }
        } catch (error){
            //alert('ERROR: Error en el intento de agregar el supervisor.')
            setShowAlert(true);
            setAlertMessage('ERROR: Error en el intento de agregar el supervisor.');
            setAlertTipo('danger');
        }
    };
    // Realiza la actualización del detalle
    const FuncionDetalle = async (RUN_Empresas, ID_Supervisor, RUN_Alumno) => {
        try {
          const res = await fetch('/api/bd/cambiarDetalle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ RUN_Empresas, ID_Supervisor, RUN_Alumno }) // Enviar Paso y RUN en un objeto JSON
            
          });
          const data = await res.json();
          
          if (data.error) {
            //alert(data.error);
            setShowAlert(true);
            setAlertMessage(data.error);
            setAlertTipo('danger');
          }
        } catch (error) {
          //alert('ERROR: Error en la actualizacion del paso.');
          setShowAlert(true);
          setAlertMessage('ERROR: Error en la actualización del paso.');
          setAlertTipo('danger');
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
                    {<Alerta mensaje = {alertMessage} tipo = {alertTipo} showAlert = {showAlert} setShowAlert = {setShowAlert}/>}
                </Form>
                </div>
            </div>
            )}
        <Modal isOpen={showModal}>
            <ModalHeader closeButton = {'true'}>Confirmación
                </ModalHeader>
                <ModalBody>
                <p>¿Estás seguro de querer envíar la información sobre la empresa y el supervisor a la administración de la universidad?</p>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={entregarDataSupervisor}>
                    Enviar
                </Button>
                <Button color="secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                </Button>
                {<Alerta mensaje = {alertMessage} tipo = {alertTipo} showAlert = {showAlert} setShowAlert = {setShowAlert}/>}
            </ModalFooter>
      </Modal>
      
    </div>
    )
}   

export default FormSupervisor;