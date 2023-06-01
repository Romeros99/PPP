import React, {useState} from 'react';
import { Button, Form, Label, Input, Row,Col } from 'reactstrap';

const FormSupervisor = ({setShowButton, setShowForm, setShowFormSupervisor, showFormSupervisor}) => {
    const [supervisor, setSupervisor] = useState({ID_Supervisor: '', Nombres: '', Apellidos: '', Mail: ''});

    const handleGoBackSup = () =>{
        setShowButton(true);
        setShowForm(true);
        setShowFormSupervisor(false);
    }
    const handleInputChange = (e) =>{
        const { name, value } = e.target;
          setSupervisor(prevState => ({
            ...prevState,
            [name]: value
          }));
    }

    return(
        <div >
            {showFormSupervisor && (
            
            <div>
                <div>   
                <Form>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <Label
                                for="Nombres"
                            >
                                Nombre Supervisor
                            </Label>
                            <Input
                                id="Nombres"
                                name="Nombres"
                                type="text"
                                onChange = {handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="RUN_Empresa"
                            >
                                Apellidos Supervisor
                            </Label>
                            <Input
                                id="Apellidos"
                                name="Apellidos"
                                type="text"
                                onChange = {handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                        <Col>
                            <Label
                                for="ID_Supervisor"
                            >
                                Rut Supervisor
                            </Label>
                            <Input
                                id="ID_Supervisor"
                                name="ID_Supervisor"
                                type="text"
                                onChange = {handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Label
                                for="exampleEmail"
                            >
                                Mail Supervisor
                            </Label>
                            <Input
                                id="Mail"
                                name="Mail"
                                type="email"
                                onChange = {handleInputChange}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Button className='accept-button margin-left'>Confirmar</Button>
                    <Button onClick={() => handleGoBackSup()}>
                        Volver
                    </Button>   
                </Form>
                </div>
            </div>
            )}
            
        </div>
    )
}   

export default FormSupervisor;