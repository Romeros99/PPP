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
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
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
    console.error(error);
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
      ('${Alumno.RUN_Alumno}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`);
    
    res.status(201).json({ message: 'Pasantía creada.' });
    return;
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' })
    return error;
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

    if (Empresa.Numero_Direccion.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su numero.' });
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
module.exports = {
  getRUNsPendientes,
  crearReglamento,
  crearPasantia,
  removeReglamento,
  getEmpresas,
  crearEmpresa
}