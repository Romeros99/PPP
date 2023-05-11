//import React from 'react';

import './App.css';
import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import HomePageAlumno from "./pages/HomePageAlumno/HomePageAlumno";
import HomePageAdmin from "./pages/HomePageAdmin/HomePageAdmin";

function App() {

  
  return (
    <Router>
      <div>
        <Link to="">Alumno</Link>
        <hr />
        <Link to="/about">Admin</Link>
        <hr />
      </div>
      <Routes>
        <Route exact path="/" element={<HomePageAlumno />} />
        <Route path="/about" element={<HomePageAdmin />} />
      </Routes>
    </Router>  
  );
}

export default App;

