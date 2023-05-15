//Seccion API
const express       = require('express'),
      cors          = require('cors'),
      path          = require('path'),
      bodyParser    = require('body-parser'),
      db_operation  = require('./db/db_files/db_operation.js'),
      sgMail        = require('@sendgrid/mail');
      
const API_PORT = process.env.PORT || 5000;
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

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta para enviar correos electrónicos usando SendGrid
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

  sgMail.send(msg)
    .then(() => {
      res.send('Correo enviado exitosamente');
    })
    .catch((error) => {
      console.error(error);
      res.send('Error al enviar el correo');
    });
});

app.get('/api/bd/pendientes', async(req, res) => {
  const result = await db_operation.getAlumnosPendientes();
  res.send(result.recordset);
});

app.post('/api/bd/crear/alumno', async(req, res) => {
  await db_operation.crearAlumno(req.body, res);
});

app.post('/api/bd/crear/reglamento', async(req, res) => {
  await db_operation.crearReglamento(req.body, res);
});

app.post('/api/bd/crear/pasantia', async(req, res) => {
  await db_operation.crearPasantia(req.body, res);
});

app.post('/api/bd/eliminar/alumno', async(req, res) => {
  await db_operation.removeAlumno(req.body, res);
});

app.post('/api/bd/eliminar/reglamento', async(req, res) => {
  await db_operation.removeReglamento(req.body, res);
});

app.get('/api/pdf/:filename', (req, res) => {
    const folderPath = path.join(__dirname, 'pdfs');
    const filePath = path.join(folderPath, req.params.filename);
    res.sendFile(filePath);
});

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));