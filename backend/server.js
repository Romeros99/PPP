//Seccion API, se traen librerias
const express       = require('express'), 
      cors          = require('cors'), 
      bodyParser    = require('body-parser'),
      db_operation  = require('./db/db_files/db_operation.js'),
      sgMail        = require('@sendgrid/mail');
      
const API_PORT = process.env.PORT || 5000; //se corre api en el puerto 5000
const app = express();
let client;
let session;
// Configura la API Key de SendGrid
sgMail.setApiKey('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');

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.static('public'));

//Conexion con front
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta para enviar correos electrónicos usando SendGrid y desde cual mail se envia
app.post('/api/mail/send-email', function(req, res) {
  const {to, subject, text, html, sandboxMode = false } = req.body;
  const msg = {
      to,
      from: 'pasantiasppuai@gmail.com',
      subject,
      text,
      html,
      mail_settings: {
        sendbox_mode:{
          enable: sandboxMode
        }
      }
  }
  //mensaje en el frontend
  sgMail.send(msg)
    .then(() => {
      res.send('Correo enviado exitosamente');
    })
    .catch((error) => {
      console.error(error);
      res.send('Error al enviar el correo');
    });
});

//request de traer empresas
app.get('/api/bd/empresas', async(req, res) => {
  const result = await db_operation.getEmpresas();
  res.send(result.recordset);
});
//request de traer RUNs de alumnos en estado pendiente
app.get('/api/bd/pendientes', async(req, res) => {
  const result = await db_operation.getRUNsPendientes();
  res.send(result.recordset);
});

//request de crear reglamento
app.post('/api/bd/crear/reglamento', async(req, res) => {
  await db_operation.crearReglamento(req.body, res);
});

//request de crear pasantia
app.post('/api/bd/crear/pasantia', async(req, res) => {
  await db_operation.crearPasantia(req.body, res);
});

//request de eliminar pasantia
app.post('/api/bd/eliminar/reglamento', async(req, res) => {
  await db_operation.removeReglamento(req.body, res);
});

//request de crear empresa
app.post('/api/bd/crear/empresa', async(req, res) => {
  await db_operation.crearEmpresa(req.body, res);
});

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));