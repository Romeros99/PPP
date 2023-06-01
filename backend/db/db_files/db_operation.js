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
const getPasoActual = async(Alumno, res) => {
  try {
    let paso_actual = 0;

    //Se comienza verificando si el alumno tiene un detalle de pasantía creado, en caso de ser así, se devuelve el paso que está registrado en su detalle.
    const pool = await sql.connect(config);
    const tmp = await pool.request()
    .query(`SELECT * FROM Detalle_Pasantia
            WHERE RUN_Alumno = '${Alumno.RUN_Alumno}'`);
    
    if (tmp.recordset.length > 0) {
      paso_actual = await pool.request()
      .query(`SELECT Paso_Actual FROM Detalle_Pasantia
              WHERE RUN_Alumno = '${Alumno.RUN_Alumno}'`);
      
      res.status(201).json({ message: 'Operación Exitosa.' });
      return paso_actual;
    }

    else {
      //Si no tiene detalle de pasantía creado, se verifica si el alumno firmó el reglamento, en caso de ser así, ya completó el paso 1 y debe esperar la aprobación del admin.
      //Por lo tanto, se devuelve el paso 1.5
      const tmp2 = await pool.request()
      .query(`SELECT * FROM Reglamentos
              WHERE RUN_Alumno = '${Alumno.RUN_Alumno}'`);
        
      if (tmp2.recordset.length > 0){
        paso_actual = 1.5;
        res.status(201).json({ message: 'Operación Exitosa.' });
        return paso_actual;
      }
      else {
        //En caso de que no haya firmado el reglamento, se devuelve el paso 1.
        paso_actual = 1;
        res.status(201).json({ message: 'Operación Exitosa.' });
        return paso_actual;
      }
    }
    
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' })
    return error;
  }
}

module.exports = {
  getRUNsPendientes,
  crearReglamento,
  crearPasantia,
  removeReglamento,
  getPasoActual
}