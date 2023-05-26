//Seccion API, se traen librerias
const express       = require('express'), 
      cors          = require('cors'), 
      path          = require('path'),
      bodyParser    = require('body-parser');
      //db_operation  = require('./db/db_files/db_operation.js');

const API_PORT = process.env.PORT || 4000; //se corre api en el puerto 4000
const app = express();
let client;
let session;

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

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));