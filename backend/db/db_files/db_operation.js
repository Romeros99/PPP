const config    = require('./db_config'),
      sql       = require('mssql')

const getAlumnos = async(run_alumno) => {
  try {
    let pool = await sql.connect(config);
    let alumnos = await pool.request()
    .query(`SELECT * FROM Alumnos 
            WHERE RUN_Alumno = '${run_alumno}'`);
    console.log(alumnos);
    return alumnos;
  }
  catch(error) {
    console.log(error);
  }
}

const getAlumnosPendientes = async() => {
  try {
    let pool = await sql.connect(config);
    let alumnosPendientes = pool.request()
    .query(`SELECT A.* FROM Alumnos AS A 
            JOIN Reglamentos AS R ON A.RUN_Alumno = R.RUN_Alumno
            LEFT JOIN Detalle_Pasantia AS DP ON A.RUN_Alumno = DP.RUN_Alumno
            WHERE R.Decision = 1 AND DP.RUN_Alumno IS NULL`);
    console.log(alumnosPendientes);
    return alumnosPendientes;
  }
  catch(error) {
    console.log(error);
  }
}

const crearAlumno = async(Alumno) => {
  try {
    let pool = await sql.connect(config);
    let alumnos = pool.request().query(`INSERT INTO Alumnos VALUES
      ('${Alumno.RUN_Alumno}', '${Alumno.Nombres}', '${Alumno.Apellidos}', '${Alumno.Mail_UAI}', '${Alumno.Mail_Personal}')`);
    console.log(alumnos);
    return alumnos;
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = {
  getAlumnos,
  getAlumnosPendientes,
  crearAlumno
}