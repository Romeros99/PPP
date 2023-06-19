//Seccion API, se traen librerias
const cookieParser = require('cookie-parser');
const express       = require('express'), 
      cors          = require('cors'), 
      path          = require('path'),
      db_operation  = require('./db_omega/db_operations.js'),
      {createTokens, validateToken, Decode_user_data}=require('./Token_operations.js');
const API_PORT = process.env.PORT || 4000; //se corre api en el puerto 4000.
const app = express();
let client;
let session;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

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
//operaciones de login para alumnos
app.post('/omega/login_Alumnos', async (req, res) => {
  const mail = req.body.mail;
  const password= req.body.password;
  try {
    const isAuthenticated = await db_operation.Login_Alumno(mail, password);
    if (isAuthenticated) {
      //generar token  //instalar jsonwebtoken y cookie-parser
      const userData= await db_operation.get_userdata(mail, 'alumno')//obtener todos los datos del usuario para el token
      const userDataJSON = JSON.parse(userData);
      const run = userDataJSON.RUN_Alumno
      const nombre = userDataJSON.Nombres
     
      const accessToken = createTokens(mail,run,nombre,'alumno');
      res.cookie("access-Token", accessToken, {
        maxAge: 60*60*24*30*1000  //cookie dura 30 dias 
      });
      res.json({message: 'valid_credentials'});

    } else {
      res.json({message: 'invalid_credentials'});
    }
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
  }
  
});
//operaciones de login para administradores
app.post('/omega/login_Admin', async (req, res) => {
  const mail = req.body.mail;
  const password= req.body.password;
  try {
    const isAuthenticated = await db_operation.Login_Admin(mail, password);
    if (isAuthenticated) {
      const userData= await db_operation.get_userdata(mail, 'admin')//obtener todos los datos del usuario para el token
      const userDataJSON = JSON.parse(userData);
      const run = userDataJSON.RUN_Alumno
      const nombre = userDataJSON.Nombres
     
      const accessToken = createTokens(mail,run,nombre,'admin');

      
      res.cookie("access-Token", accessToken, {
        maxAge: 60*60*24*30*1000  //cookie dura 30 dias 
      });
      res.json({message: 'valid_credentials'});

    } else {
      res.json({message: 'invalid_credentials'});
    }
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
  }
  
});

//se aplica middleware para validar el usuario y para decodificar su informacion y usarla en un request
app.get('/omega/decode_user_token', validateToken,Decode_user_data, async (req, res)=>{
  const {username, role } = req.userData; //almacena el mail institucional y rol del usuario en sesion
  //realizar operaciones con los datos del usuario
  res.json({ message: 'Datos del usuario',mail: mail});
});

//probando funcion get_userdata
app.get('/omega/get_user_data', async (req, res) => {
  const mail = req.body.mail;
  const rol = req.body.rol;
  const userData=db_operation.get_userdata(mail, rol)
  .then(userData => {
    const userDataJSON = JSON.parse(userData);
    res.json(userDataJSON); // Aquí tienes los datos del usuario en formato JSON
  })
  .catch(error => {
    console.error(error); // Manejo de errores
  });
});

//obtener mail de alumno por rut
app.get('/omega/bd/get/mail_alumno', async(req, res) => {
  const { RUN } = req.query;
  await db_operation.getMailFromRut(RUN, res);
});

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));