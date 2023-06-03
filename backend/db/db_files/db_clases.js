// Clases para generar registros en BD
class Alumno{
  constructor(RUN_Alumno, Nombres, Apellidos, Mail_UAI, Mail_Personal){
    this.RUN_Alumno = RUN_Alumno;
    this.Nombres = Nombres;
    this.Apellidos = Apellidos;
    this.Mail_UAI = Mail_UAI;
    this.Mail_Personal = Mail_Personal;
  }
}

class Reglamento{
  constructor(ID_Reglamento, RUN_Alumno, ID_Version, Fecha, Decision){
    this.ID_Reglamento = ID_Reglamento;
    this.RUN_Alumno = RUN_Alumno;
    this.ID_Version = ID_Version;
    this.Fecha = Fecha;
    this.Decision = Decision;
  }
}

class Detalle_Pasantia{
  constructor(RUN_Alumno, RUN_Empresa, RUN_Profesor_Guia, ID_Reglamento, ID_Supervisor, Nombre_Proyecto, Descripcion_Proyecto, Fecha_Inicio, Horas_Semanales, Paso_actual){
    this.RUN_Alumno = RUN_Alumno;
    this.RUN_Empresa = RUN_Empresa;
    this.RUN_Profesor_Guia = RUN_Profesor_Guia;
    this.ID_Reglamento = ID_Reglamento;
    this.ID_Supervisor = ID_Supervisor;
    this.Nombre_Proyecto = Nombre_Proyecto;
    this.Descripcion_Proyecto = Descripcion_Proyecto;
    this.Fecha_Inicio = Fecha_Inicio;
    this.Horas_Semanales = Horas_Semanales;
    this.Paso_actual = Paso_actual;
    }
}
class Empresa{
  constructor(RUN_Empresas, Nombre, Calle_Direccion, Numero_Direccion, Comuna_Direccion, Ciudad_Direccion, Rubro, Estado_Convenio){
    this.RUN_Empresas = RUN_Empresas;
    this.Nombre = Nombre;
    this.Calle_Direccion = Calle_Direccion;
    this.Numero_Direccion = Numero_Direccion;
    this.Comuna_Direccion = Comuna_Direccion;
    this.Ciudad_Direccion = Ciudad_Direccion;
    this.Rubro = Rubro;
    this.Estado_Convenio = Estado_Convenio;
  }
}

class Empresa{
  constructor(RUN_Empresas, Nombre, Calle_Direccion, Numero_Direccion, Comuna_Direccion, Ciudad_Direccion, Rubro, Estado_Convenio){
    this.RUN_Empresas = RUN_Empresas;
    this.Nombre = Nombre;
    this.Calle_Direccion = Calle_Direccion;
    this.Numero_Direccion = Numero_Direccion;
    this.Comuna_Direccion = Comuna_Direccion;
    this.Ciudad_Direccion = Ciudad_Direccion;
    this.Rubro = Rubro;
    this.Estado_Convenio = Estado_Convenio;
  }
}

class Supervisor{
  constructor(RUN_Empresas, Nombres, Apellidos, Mail){
    this.RUN_Empresas = RUN_Empresas;
    this.Nombres = Nombres;
    this.Apellidos = Apellidos;
    this.Mail = Mail;
  }
}
module.exports = Alumno, Reglamento, Detalle_Pasantia, Empresa, Supervisor;