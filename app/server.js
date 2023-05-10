const express       = require('express'),
      db_operation  = require('./db_files/db_operation.js'),
      cors          = require('cors');
      clases        = require('./db_files/db_clases.js');

const API_PORT = process.env.PORT || 5000;
const app = express();
let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/api', async(req, res) => {
  console.log('called');
  const result = await db_operation.getAlumnosPendientes();
  res.send(result.recordset);
});

app.post('/api/crear', async(req, res) => {
  console.log('called');
  const result = await db_operation.crearAlumno(req.body);
})

//let NicolasGomez = new Alumno("19.436.418-9", "Nicolas Adolfo", "Gomez Marchesse", "nicogomez@alumnos.uai.cl", "nicogomezmarchesse@gmail.com");
//db_operation.crearAlumno(NicolasGomez);

//db_operation.getAlumnos('20.358.429-6')

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));