import './HomePageAlumno.css';
import { useState } from 'react';


export default function HomePageAlumno() {
  // Estado para controlar si se ha aceptado el reglamento
  const [aceptado, setAceptado] = useState(false);

  // Estados para controlar los valores del formulario
  const [nombre, setNombre] = useState('');
  const [mail, setMail] = useState('');
  const [rut, setRut] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer algo con los valores de nombre, mail y rut
    // como enviarlos a una API o almacenarlos en el localStorage
  };

  // Si no se ha aceptado el reglamento, se muestra el botón de aceptar
  if (!aceptado) {
    return (
      <div className="center">
        <h1>Confirmación de reglamento</h1>
        <embed src="./guia 1.pdf" width="500" height="375" type='application/pdf'/>
        <div className='botones'>
        <button onClick={() => setAceptado(true)}>Aceptar</button>
        <button>Rechazar</button>
        </div>

      </div>
    );
  }

  // Si se ha aceptado el reglamento, se muestra el formulario
  return (
    <div className="center">
      <h1>Confirmación de reglamento</h1>
      <embed src="./guia 1.pdf" width="500" height="375" type='application/pdf'/>
      <p>ingrese sus datos</p>
      <form onSubmit={handleSubmit} className='formulario'>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
        </label>
        <label>
          Rut:
          <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
        </label>
        <button type="submit">Confirmar</button>
        <button onClick={() => setAceptado(false)}>Cancelar</button>
      </form>
    </div>
  );
}

       
