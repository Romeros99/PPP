const config    = require('./db_config'),
      sql       = require('mssql')


//Función que retorna todos los alumnos que estén en estado Pendiente de Verificación de Requisitos (Aquellos que tengan un registro de su reglamento pero que todavía no tengan su registro de detalle pasantía).
const getRUNsPendientes = async() => {
  try {
    const pool = await sql.connect(config);
    const RUNsPendientes = await pool.request()
    .query(`SELECT R.RUN_Alumno FROM Reglamentos AS R 
            LEFT JOIN Detalle_Pasantia AS DP ON R.RUN_Alumno = DP.RUN_Alumno
            WHERE DP.RUN_Alumno IS NULL`);

    return RUNsPendientes;
  }
  catch(error) {
    console.log(error);
    return error;
  }
}

//Función para eliminar un registro de confirmación de reglamento utilizando el RUT del alumno como método de filtración.
const removeReglamento = async(Alumno, res) => {
  try {
    const pool = await sql.connect(config);
    const deleteReglamento = await pool.request()
    .query(`DELETE FROM Reglamentos
            WHERE RUN_Alumno = '${Alumno.RUN_Alumno}'`);
    
    res.status(201).json({ message: 'Reglamento eliminado exitosamente.' });
    return;
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
    return error;
  }
}

//Función para crear un registro de reglamento.
const crearReglamento = async(Reglamento, res) => {
  try {
    const pool = await sql.connect(config);
    const insertReglamento = await pool.request().query(`INSERT INTO Reglamentos VALUES
      ('${Reglamento.RUN_Alumno}', 1, convert(DATETIME, '${Reglamento.Fecha}'))`);
    
    res.status(201).json({ message: 'Reglamento aceptado.' });
    return;
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' })
    return error;
  }
}

//Función para crear un registro de detalle de pasantía.
const crearPasantia = async(Alumno, res) => {
  try {
    //Deja el resto de las calumnas en NULL ya que son la información que se debería registrar en el siguiente Paso de la aplicación.
    const pool = await sql.connect(config);
    const insertPasantia = await pool.request().query(`INSERT INTO Detalle_Pasantia VALUES
      ('${Alumno.RUN_Alumno}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2.0)`);
    
    res.status(201).json({ message: 'Pasantía creada.' });
    return;
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' })
    return error;
  }
}

//Función para obtener el paso actual del alumno, dado su rut
const getPasoActual = async(RUN, res) => {
  try {
    let step = 0;
    //Se comienza verificando si el alumno tiene un detalle de pasantía creado, en caso de ser así, se devuelve el paso que está registrado en su detalle.
    const pool = await sql.connect(config);
    const tmp = await pool.request()
    .query(`SELECT * FROM Detalle_Pasantia
            WHERE RUN_Alumno = '${RUN}'`);
    
    if (tmp.recordset.length > 0) {
      const resultado = await pool.request()
      .query(`SELECT Paso_Actual FROM Detalle_Pasantia
              WHERE RUN_Alumno = '${RUN}'`);
      step = resultado.recordset[0].Paso_Actual;
    }
    else {
      //Si no tiene detalle de pasantía creado, se verifica si el alumno firmó el reglamento, en caso de ser así, ya completó el paso 1 y debe esperar la aprobación del admin.
      //Por lo tanto, se devuelve el paso 1.5
      const tmp2 = await pool.request()
      .query(`SELECT * FROM Reglamentos
              WHERE RUN_Alumno = '${RUN}'`);
        
      if (tmp2.recordset.length > 0){
        step = 1.5;
      }
      else {
        //En caso de que no haya firmado el reglamento, se devuelve el paso 1.
        step = 1;
      }
    }
    res.json({ step : step });
    return;
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
}

const getEmpresas = async() => {
  try {
    const pool = await sql.connect(config);
    const RUNsEmpresas = await pool.request()
    .query(`SELECT * FROM Empresas;`);

    return RUNsEmpresas;
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
    return error;
  }
}

//Funcion para crear empresa en BBDD
const crearEmpresa = async(Empresa, res) => {
  try {
    //Verifica que el RUT tenga un formato adecuado y, en caso de no tenerlo, envía un error como respuesta al Frontend.
    const RUNRegExp = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9]$/;
    if (!RUNRegExp.test(Empresa.RUN_Empresas)){
      res.status(400).json({ error: 'ERROR: RUN inválido.' });
      return;
    }

    //Verifica que los campos del alumno no estén vacíos y, en caso de ser vacíos, envía un error como respuesta al Frontend.
    if (Empresa.Nombre.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su nombre.' });
      return;
    }

    if (Empresa.Calle_Direccion.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su calle.' });
      return;
    }

    if (isNaN(Empresa.Numero_Direccion)){
      res.status(400).json({ error: 'ERROR: Por favor ingrese un numero en el numero de la direccion.' });
      return;
    }

    if (Empresa.Comuna_Direccion.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su comuna.' });
      return;
    }

    if (Empresa.Ciudad_Direccion.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su ciudad.' });
      return;
    }

    if (Empresa.Rubro.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su rubro.' });
      return;
    }

    if (Empresa.Estado_Convenio.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su estado.' });
      return;
    }

    //Consulta si el alumno ya está en la base de datos, en caso de ser así, envía un error al Frontend.
    const pool = await sql.connect(config);
    const result = await pool.request()
    .query(`SELECT * FROM Empresas
            WHERE RUN_Empresas = '${Empresa.RUN_Empresas}'`);

    if (result.recordset.length > 0) {
      res.status(400).json({ error: 'ERROR: Empresa ya registrada.' });
      return;
    }

    //En caso de que no se haya enviado un error, se realiza el Query para agregar al alumno a la base de datos.
    const insertEmpresa = await pool.request().query(`INSERT INTO Empresas VALUES
      ('${Empresa.RUN_Empresas}', '${Empresa.Nombre}', '${Empresa.Calle_Direccion}', '${Empresa.Numero_Direccion}', '${Empresa.Comuna_Direccion}', '${Empresa.Ciudad_Direccion}', '${Empresa.Rubro}', '${Empresa.Estado_Convenio}')`);
    
    res.status(201).json({ message: 'Empresa registrada exitosamente.' });
    return;
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
    return error;
  }
}

const crearSupervisor = async(Supervisor, res) => {
  try {

    //Verifica que los campos del alumno no estén vacíos y, en caso de ser vacíos, envía un error como respuesta al Frontend.
    if (Supervisor.Nombres.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese un nombre.' });
      return;
    }

    if (Supervisor.Apellidos.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese un apellido.' });
      return;
    }

    if (Supervisor.Mail.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese un mail.' });
      return;
    }

    //Consulta si el alumno ya está en la base de datos, en caso de ser así, envía un error al Frontend.
    const pool = await sql.connect(config);
    const result = await pool.request()
    .query(`SELECT * FROM Supervisores
            WHERE ID_Supervisor = '${Supervisor.ID_Supervisor}'`);

    if (result.recordset.length > 0) {
      res.status(400).json({ error: 'ERROR: Supervisor ya registrado.' });
      return;
    }

    //En caso de que no se haya enviado un error, se realiza el Query para agregar al alumno a la base de datos.

    const insertSupervisor = await pool.request().query(`INSERT INTO Supervisores (RUN_Empresas, Nombres, Apellidos, Mail) VALUES
      ('${(Supervisor.RUN_Empresas)}', '${Supervisor.Nombres}', '${Supervisor.Apellidos}', '${Supervisor.Mail}')`);
    
    res.status(201).json({ message: 'Supervisor registrado exitosamente.' });
    return;
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
    return error;
  }
}
module.exports = {
  getRUNsPendientes,
  crearReglamento,
  crearPasantia,
  removeReglamento,
  getEmpresas,
  crearEmpresa,
  crearSupervisor,
  getPasoActual
}