import React, {useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import FuncionPaso from '../FuncionPaso/FuncionPaso';

const RechazoSupervisor = () => {
    const { RUN } = useParams();
    const navigate = useNavigate();
    const Paso = 2;
    const [step, setCurrentStep] = useState(0);

    const getPasoAlumno = async (RUN) => {
          const response = await fetch(`/api/bd/pasoactual?RUN=${RUN}`);
      
          if (!response.ok) {
            throw new Error('Error en la búsqueda del Paso del Alumno');
          }

          const data = await response.json();
          const step = data.step;
          //Setter del CurrentStep
          setCurrentStep(step);
          console.log("step:", step)

          //Solo puede entrar 1 vez el supervisor para que se actualice la base de datos
          if (step === 3.5) {
            FuncionPaso(Paso, RUN);
            //funcion eliminar supervisor
            navigate('/rechazado');
            
          } else{
            navigate('/respondido');
          }
      }
    useEffect(() => {
      getPasoAlumno(RUN);
      console.log(step);
        
      }, [])
    

    };

export default RechazoSupervisor;