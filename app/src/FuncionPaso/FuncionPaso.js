//funcion para actualizar el paso en el que se encuentra un alumno
const FuncionPaso = async (Paso, RUN) => {
    try {
      console.log('RUN: ',RUN,  'y Paso: ',Paso);
      const res = await fetch('/api/bd/cambiarPaso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ Paso, RUN }) // Enviar Paso y RUN en un objeto JSON
        
      });
      const data = await res.json();
      console.log(data);

      if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      alert('ERROR: Error en la actualizacion del paso.');
    }
  };

export default FuncionPaso;