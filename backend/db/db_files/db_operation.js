const config    = require('./db_config'),
      sql       = require('mssql')

//const removeAlumnos = async(RUN_Alumno) => {
//  try {
//    let pool = await sql.connect(config);
//    let alumnos = await pool.request()
//    .query(`SELECT * FROM Alumnos 
//            WHERE RUN_Alumno = '${run_alumno}'`);
//    console.log(alumnos);
//    return alumnos;
//  }
//  catch(error) {
//    console.log(error);
//  }
//}

const getAlumnosPendientes = async() => {
  try {
    let pool = await sql.connect(config);
    let alumnosPendientes = await pool.request()
    .query(`SELECT A.* FROM Alumnos AS A 
            JOIN Reglamentos AS R ON A.RUN_Alumno = R.RUN_Alumno
            LEFT JOIN Detalle_Pasantia AS DP ON A.RUN_Alumno = DP.RUN_Alumno
            WHERE R.Decision = 1 AND DP.RUN_Alumno IS NULL`);
    console.log(alumnosPendientes);
    return alumnosPendientes;
  }
  catch(error) {
    console.log(error);
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
    
    let pool = await sql.connect(config);
    let result = await pool.request()
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
    res.status(500).json({ error: 'ERROR: Error interno de servidor.' })
    return;
  }
}

module.exports = {
  //getAlumnos,
  getAlumnosPendientes,
  crearAlumno
}