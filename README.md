Para la correcta ejecución de la aplicación, es necesario instalar las siguientes dependencias:
Dentro de ./app:

npm i react nodemon react-bootstrap reactstrap bootstrap react-router-dom

Dentro de ./backend:

npm i @sendgrid/mail body-parser cors express mssql nodemon path

Dentro de ./omega:

npm i body-parser cors express mssql nodemon path

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

Finalmente, para inicar la aplicación, se debe ejecutar el siguiente código en un terminal dentro de ./app

npm run dev