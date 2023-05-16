import './App.css';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

//Importa las paginas de alumno y administrador
import HomePageAlumno from "./Pages/HomePageAlumno/HomePageAlumno";
import HomePageAdmin from "./Pages/HomePageAdmin/HomePageAdmin";

//Función principal
function App() {
  return (
    <Router>
      <nav className="navbar">  
   <h1 className='navheader'>Pasantías UAI</h1> 
        <ul>
          <li>
            <Link to="/" className="btn">Alumno</Link>
          </li>
          <li>
            <Link to="/about" className="btn">Admin</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<HomePageAlumno />} />
        <Route path="/about" element={<HomePageAdmin />} />
      </Routes>
    </Router> 
  );
}

export default App;
