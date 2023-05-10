CREATE TABLE Alumnos(
    RUN_Alumno VARCHAR(12) NOT NULL,
    Nombres VARCHAR(64),
    Apellidos VARCHAR(64),
    Mail_UAI VARCHAR(35),
    Mail_Personal VARCHAR(35),
    PRIMARY KEY (RUN_Alumno)
);

CREATE TABLE Reglamentos(
    ID_Reglamento SMALLINT NOT NULL,
    RUN_Alumno VARCHAR(12),
    ID_Version TINYINT,
    Fecha DATE,
    Decision BOOLEAN,
    PRIMARY KEY (ID_Reglamento),
    FOREIGN KEY (RUN_Alumno) REFERENCES Alumnos(RUN_Alumno)
);

CREATE TABLE Empresas(
    RUN_Empresas VARCHAR(12) NOT NULL,
    Nombre VARCHAR(128),
    Calle_Direccion VARCHAR(64),
    Numero_Direccion NUMERIC(8,1),
    Comuna_Direccion VARCHAR(32),
    Ciudad_Direccion VARCHAR(32),
    Rubro VARCHAR(128),
    Estado_Convenio VARCHAR(10),
    PRIMARY KEY (RUN_Empresas)
);

CREATE TABLE Supervisores(
    ID_Supervisor SMALLINT NOT NULL,
    RUN_Empresas VARCHAR(12),
    Nombres VARCHAR(64),
    Apellidos VARCHAR(64),
    Mail VARCHAR(35),
    PRIMARY KEY (ID_Supervisor),
    FOREIGN KEY (RUN_Empresas) REFERENCES Empresas(RUN_Empresas)   
);

CREATE TABLE Profesor_Guia(
    RUN_Profesor_Guia VARCHAR(12),
    Nombres VARCHAR(64),
    Apellidos VARCHAR(64),
    Mail_UAI VARCHAR(35),
    Mail_Personal VARCHAR(35),
    Area_Especialidad VARCHAR(64),
    PRIMARY KEY (RUN_Profesor_Guia)
);

CREATE TABLE Detalle_Pasantia(
    RUN_Alumno VARCHAR(12) REFERENCES Alumnos(RUN_Alumno),
    RUN_Empresas VARCHAR(12) REFERENCES Empresas(RUN_Empresas),
    RUN_Profesor_Guia VARCHAR(12) REFERENCES Profesor_Guia(RUN_Profesor_Guia),
    ID_Reglamento SMALLINT REFERENCES Reglamentos(ID_Reglamento),
    ID_Supervisor SMALLINT,
    Nombre_Proyecto VARCHAR(64),
    Descripcion_Proyecto VARCHAR(120),
    Fecha_Inicio DATE,
    Horas_Semanales TINYINT,
    PRIMARY KEY (RUN_Alumno, RUN_Empresas, RUN_Profesor_Guia, ID_Reglamento)
);

INSERT INTO Alumnos(RUN_Alumno, Nombres, Apellidos, Mail_UAI, Mail_Personal)
VALUES
    ('19.248.635-1', 'Juan Luis', 'Perez Rodríguez', 'juanluperez@alumnos.uai.cl', 'jlprodriguez@gmail.com'),
    ('20.648.241-4', 'Santiago', 'Silva Lopez', 'santiasilva@alumnos.uai.cl', 'santisilva123@hotmail.com'),
    ('20.358.429-6', 'Federico Andrés', 'Gómez Marchesse', 'fedgomez@alumnos.uai.cl', 'federicogomez99@gmail.com');

INSERT INTO Reglamentos(ID_Reglamento, RUN_Alumno, ID_Version, Fecha, Decision)
VALUES
    (1, '19.248.635-1', 1, STR_TO_DATE("03/04/2023", "%d/%m/%Y"), FALSE),
    (2, '20.648.241-4', 1, STR_TO_DATE("21/04/2023", "%d/%m/%Y"), TRUE),
    (3, '20.358.429-6', 1, STR_TO_DATE("05/05/2023", "%d/%m/%Y"), TRUE);

INSERT INTO Empresas(RUN_Empresas, Nombre, Calle_Direccion, Numero_Direccion, Comuna_Direccion, Ciudad_Direccion, Rubro, Estado_Convenio)
VALUES
    ('96.653.890-2', 'Maersk Chile S.A.', 'Av. Apoquindo', 3650, 'Las Condes', 'Santiago', 'Comerciantes al por Mayor de Vehículos Motorizados', 'Vigente'),
    ('90.286.000-2', 'Brititsh American Tobacco Chile Operaciones S.A.', 'Fundo La Rotunda Ruta 68', 0, 'Casablanca', 'Casablanca', 'Industrias Manufactureras de Tabaco', 'Pendiente');
    