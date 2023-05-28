//Información para establecer la conección con la Base de Datos en el Servidor SQLExpress
const config = {
    user: "FedeGomez",
    password: "foo",
    server: "DESKTOP-IERM6U8",
    database: "Omega",
    options: {
      trustServerCertificate: true,
      trustedConnection: false,
      enableArithAbort: true,
      instancename: "SQLEXPRESS"
    },
    port: 1433
  }
  
  module.exports = config;
  