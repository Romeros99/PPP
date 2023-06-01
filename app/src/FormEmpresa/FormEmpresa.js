import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, Row,Col } from 'reactstrap';
import './FormEmpresa.css';


function FormEmpresa(){
    const [showForm, setShowForm] = useState(false);
    const [showBar, setShowBar] = useState(true);
    const [empresa, setEmpresa] = useState({RUN_Empresas: '', Nombre: '', Calle_Direccion: '', Numero_Direccion: '', Comuna_Direccion: '', Ciudad_Direccion: '', Rubro: '', Estado_Convenio: ''});
    const [selectedEmpresa, setSelectedEmpresa] = useState('');
    const [returnedRUNs, setReturnedRUNs] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);
    const [counter, setCounter] = useState(0);
    

    //estilos
    const modalStyles = {
        position: "absolute",
        top: "30%",
        left: "40%",
        transform:'translate (-50%, -50%)'
      }
      const ButtonStyles = {
        position: "absolute",
        top: "60%",
        left: "50%",
        transform:'translate (-50%, -50%)'
      }
    
    //Setea el formulario con los datos de la empresa que elige en el seleccionador

    //Abre el formulario
    const handleEnviarClick = () => {
        setCounter(0);
        setIsReadOnly(true);
        setShowBar(false)
        setShowForm(true);
      };
    
    //Se crea empresa en BBDD si se agrega una nueva
    const entregarDataEmpresa = async () => {
        try {
            const respuesta = await fetch('/api/bd/crear/empresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({   
                RUN_Empresas: empresa.RUN_Empresas, 
                Nombre: empresa.Nombre, 
                Calle_Direccion: empresa.Calle_Direccion, 
                Numero_Direccion: empresa.Numero_Direccion,
                Comuna_Direccion: empresa.Comuna_Direccion,
                Ciudad_Direccion: empresa.Ciudad_Direccion,
                Rubro: empresa.Rubro,
                Estado_Convenio: 'Pendiente'})
            
            })
        
            const data = await respuesta.json();
      
            if (data.error) {
              alert(data.error);
            }
        } catch (error){
            alert('ERROR: Error en el intento de creación de empresa.')
        }
    };

    //permite lectura o escritura
    const handleInputChange = (e) => {
        if (isReadOnly) {
            return; // No realizar ninguna actualización si está en modo solo lectura
          }
        
          const { name, value } = e.target;
          setEmpresa(prevState => ({
            ...prevState,
            [name]: value
          }));
        };
    
    const handleClick = () => {
        if (counter % 2 === 0) {
            console.log("Acción A");
        } else {
            entregarDataEmpresa()
            // Realiza la acción B
            console.log("Acción B");
        }
        setCounter(counter + 1);
        };

    const handleAgregarEmpresa = () => {
        setCounter(1);
        setEmpresa({RUN_Empresas: '', Nombre: '', Calle_Direccion: '', Numero_Direccion: '', Comuna_Direccion: '', Ciudad_Direccion: '', Rubro: '', Estado_Convenio: ''});
        setShowBar(false)
        setShowForm(true);
        setIsReadOnly(false);
    }

    const handleGoBack = () => {
        setEmpresa({
            Nombre: '',
            RUN_Empresas: '',
            Ciudad_Direccion: '',
            Comuna_Direccion: '',
            Calle_Direccion: '',
            Numero_Direccion: '',
            Rubro: ''
        });
        setShowBar(true);
        setShowForm(false);
        setIsDisabled(true);
      };

    return(
        <div>
        <div>
            {showBar && (   
        <FormGroup >
            <div className = "d-flex mx-auto flex-column align-items-center custom-form-group">
            <Input type="select" onChange = {handleEmpresaChange}>
            <option value="">Seleccione una empresa</option>
            {returnedRUNs.map((empresa, index) => (
            <option key={index} value={empresa.RUN_Empresas}>{empresa.Nombre}</option>
            ))}
            </Input>
            <div className="mt- button-container">
            <Button  disabled={isDisabled} color='primary' onClick = {handleEnviarClick}>Enviar</Button>
            <Button onClick = {handleAgregarEmpresa}>Agregar Empresa</Button>
            </div>
        </div>
        </FormGroup>
            )}
        </div>
          <div>
            {showForm && (
            <div>
                <Button onClick={handleGoBack}>
                    &larr;
                </Button>
                <div>   
                <Form style={modalStyles}>
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
                                value = {empresa.Nombre}
                                onChange = {handleInputChange}
                                disabled={isReadOnly}
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
                                value = {empresa.RUN_Empresas}
                                onChange = {handleInputChange}
                                disabled={isReadOnly}
                            />
                        </Col>
                    </Row>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <Label
                                for="exampleEmail"
                            >
                                Ciudad
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="Ciudad_Direccion"
                                type="text"
                                value = {empresa.Ciudad_Direccion}
                                onChange = {handleInputChange}
                                disabled={isReadOnly}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="exampleEmail"
                            >
                                Comuna
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="Comuna_Direccion"
                                type="text"
                                value = {empresa.Comuna_Direccion}
                                onChange = {handleInputChange}
                                disabled={isReadOnly}
                            />
                        </Col>   
                    </Row>
                    <Row className="row-cols-lg-auto g-3 align-items-center"> 
                        <Col>
                            <Label
                                for="exampleEmail"
                            >
                                Calle
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="Calle_Direccion"
                                type="text"
                                value = {empresa.Calle_Direccion}
                                onChange = {handleInputChange}
                                disabled={isReadOnly}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="exampleEmail"
                            >
                                Numero de calle
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="Numero_Direccion"
                                type="text"
                                value = {empresa.Numero_Direccion}
                                onChange = {handleInputChange}
                                disabled={isReadOnly}
                            />
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <Label
                                for="exampleEmail"
                            >
                                Rubro
                            </Label>
                            <Input
                                id="exampleEmail"
                                name="Rubro"
                                type="text"
                                value = {empresa.Rubro}
                                onChange = {handleInputChange}
                                disabled={isReadOnly}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Button className='accept-button margin-left' onClick = {() => handleClick()}>Confirmar</Button>
                </Form>
                </div>
            </div>
            )}
            
            </div>
        </div>
    );
}

export default FormEmpresa;