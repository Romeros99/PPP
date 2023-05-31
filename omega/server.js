//Seccion API, se traen librerias
const express       = require('express'), 
      cors          = require('cors'), 
      path          = require('path'),
      db_operation  = require('./db_omega/db_operations.js');

const API_PORT = process.env.PORT || 4000; //se corre api en el puerto 4000.
const app = express();
let client;
let session;
app.use(express.json());
app.use(cors());

//request de traer alumnos en estado pendiente.
app.post('/omega/bd/pendientes', async(req, res) => {
  const RUNs = db_operation.arr_to_str(req.body);
  const result = await db_operation.getAlumnosPendientes(RUNs, res);
  
  res.send(result.recordset);
});

//request de crear alumno
app.post('/omega/bd/crear/alumno', async(req, res) => {
  await db_operation.crearAlumno(req.body, res);
});

//request de eliminar alumno
app.post('/omega/bd/eliminar/alumno', async(req, res) => {
  await db_operation.removeAlumno(req.body, res);
});

//trae el pdf desde la carpeta de pdfs
app.get('/omega/pdf/:filename', (req, res) => {
  const folderPath = path.join(__dirname, 'pdfs');
  const filePath = path.join(folderPath, req.params.filename);
  res.sendFile(filePath);
});


app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));