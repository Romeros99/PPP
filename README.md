Para la correcta ejecución de la aplicación, es necesario instalar las siguientes dependencias:
Dentro de ./app:

npm i react nodemon react-bootstrap reactstrap bootstrap react-router-dom eslint

Dentro de ./backend:

npm i @sendgrid/mail body-parser cors express mssql nodemon

Dentro de ./omega:

npm i body-parser cors express mssql nodemon path jsonwebtoken cookie-parser

Además, se debe crear un servidor de bases de datos SQL en Microsoft Server SQL y modificar el archivo ./backend/db/db_files/db_config.js con la siguiente información:

user: ,
password: ,
server: ,
database: ,
options:
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
instancename: "SQLEXPRESS"

port: 

Lo mismo se debe hacer para el servidor de bases de datos SQL con la información del archivo ./omega/db_omega/db_config.js

Los modelos físicos para crear cada base de datos en los motores de bases de datos (SQL Server) son los archivos BD_App.sql para la base de datos Pasantia Paso a Paso y BD_Omega.sql para la base de datos Omega.

Finalmente, para inicar la aplicación, se debe ejecutar el siguiente código en un terminal dentro de ./app

npm run dev