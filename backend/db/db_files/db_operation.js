const config    = require('./db_config'),
      sql       = require('mssql')

const getAlumnosPendientes = async() => {
  try {
    const pool = await sql.connect(config);
    const alumnosPendientes = await pool.request()
    .query(`SELECT A.* FROM Alumnos AS A 
            JOIN Reglamentos AS R ON A.RUN_Alumno = R.RUN_Alumno
            LEFT JOIN Detalle_Pasantia AS DP ON A.RUN_Alumno = DP.RUN_Alumno
            WHERE DP.RUN_Alumno IS NULL`);

    return alumnosPendientes;
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
    return error;
  }
}

const removeAlumno = async(Alumno, res) => {
  try {
    const pool = await sql.connect(config);
    const deleteAlumno = await pool.request()
    .query(`DELETE FROM Alumnos 
            WHERE RUN_Alumno = '${Alumno.RUN_Alumno}'`);
    
    res.status(201).json({ message: 'Alumno eliminado exitosamente.' });
    return;
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
    return error;
  }
}

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

const crearAlumno = async(Alumno, res) => {
  try {
    const RUNRegExp = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9]$/;

    if (!RUNRegExp.test(Alumno.RUN_Alumno)){
      res.status(400).json({ error: 'ERROR: RUN inválido.' });
      return;
    }

    if (Alumno.Nombres.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su nombre.' });
      return;
    }

    if (Alumno.Apellidos.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su apellido.' });
      return;
    }

    if (Alumno.Mail_UAI.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su mail universitario.' });
      return;
    }

    if (Alumno.Mail_Personal.length === 0){
      res.status(400).json({ error: 'ERROR: Por favor ingrese su mail personal.' });
      return;
    }

    const pool = await sql.connect(config);
    const result = await pool.request()
    .query(`SELECT * FROM Alumnos
            WHERE RUN_Alumno = '${Alumno.RUN_Alumno}'`);
    
    if (result.recordset.length > 0) {
      res.status(400).json({ error: 'ERROR: Alumno ya registrado.' });
      return;
    }

    const insertAlumno = await pool.request().query(`INSERT INTO Alumnos VALUES
      ('${Alumno.RUN_Alumno}', '${Alumno.Nombres}', '${Alumno.Apellidos}', '${Alumno.Mail_UAI}', '${Alumno.Mail_Personal}')`);
    
    res.status(201).json({ message: 'Alumno registrado exitosamente.' });
    return;
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' });
    return error;
  }
}

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

const crearPasantia = async(Alumno, res) => {
  try {
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

module.exports = {
  getAlumnosPendientes,
  crearAlumno,
  crearReglamento,
  crearPasantia,
  removeAlumno,
  removeReglamento
}