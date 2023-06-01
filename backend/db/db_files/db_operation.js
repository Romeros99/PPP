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

module.exports = {
  getRUNsPendientes,
  crearReglamento,
  crearPasantia,
  removeReglamento,
  getEmpresas
}