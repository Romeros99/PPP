--Creación de las tablas
CREATE TABLE Reglamentos(
    ID_Reglamento SMALLINT NOT NULL IDENTITY(1, 1),
    RUN_Alumno VARCHAR(12),
    ID_Version TINYINT,
    Fecha DATETIME,
    PRIMARY KEY (ID_Reglamento)
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
    ID_Supervisor SMALLINT NOT NULL IDENTITY(1, 1),
    RUN_Empresas VARCHAR(12),
    Nombres VARCHAR(64),
    Apellidos VARCHAR(64),
    Mail VARCHAR(35),
    PRIMARY KEY (ID_Supervisor),
    FOREIGN KEY (RUN_Empresas) REFERENCES Empresas(RUN_Empresas)   
);

CREATE TABLE Profesor_Guia(
    RUN_Profesor_Guia VARCHAR(12) NOT NULL,
    Nombres VARCHAR(64),
    Apellidos VARCHAR(64),
    Mail_UAI VARCHAR(35),
    Mail_Personal VARCHAR(35),
    Area_Especialidad VARCHAR(64),
    PRIMARY KEY (RUN_Profesor_Guia)
);

CREATE TABLE Detalle_Pasantia(
    ID_Pasantia INT IDENTITY(1,1),
    RUN_Alumno VARCHAR(12),
	RUN_Empresas VARCHAR(12),
	RUN_Profesor_Guia VARCHAR(12),
	ID_Reglamento SMALLINT,
    ID_Supervisor SMALLINT,
    Nombre_Proyecto VARCHAR(64),
    Descripcion_Proyecto VARCHAR(120),
    Fecha_Inicio DATE,
    Horas_Semanales TINYINT,
    Paso_Actual NUMERIC(2,1),
    PRIMARY KEY (ID_Pasantia)
);

--Inserción de primeros registros de prueba
INSERT INTO Reglamentos(RUN_Alumno, ID_Version, Fecha)
VALUES
    ('19.248.635-1', 1, convert(DATETIME, '2023-04-03 14:24:32')),
    ('20.648.241-4', 1, convert(DATETIME, '2023-04-21 00:08:10')),
    ('20.358.429-6', 1, convert(DATETIME, '2023-05-05 18:34:47'));

INSERT INTO Empresas(RUN_Empresas, Nombre, Calle_Direccion, Numero_Direccion, Comuna_Direccion, Ciudad_Direccion, Rubro, Estado_Convenio)
VALUES
    ('96.653.890-2', 'Maersk Chile S.A.', 'Av. Apoquindo', 3650, 'Las Condes', 'Santiago', 'Comerciantes al por Mayor de Vehículos Motorizados', 'Vigente'),
    ('90.286.000-2', 'Brititsh American Tobacco Chile Operaciones S.A.', 'Fundo La Rotunda Ruta 68', 0, 'Casablanca', 'Casablanca', 'Industrias Manufactureras de Tabaco', 'Pendiente');

INSERT INTO Detalle_Pasantia(RUN_Alumno, RUN_Empresas, RUN_Profesor_Guia, ID_Reglamento, ID_Supervisor, Nombre_Proyecto, Descripcion_Proyecto, Fecha_Inicio, Horas_Semanales, Paso_Actual)
VALUES
    ('19.248.635-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2.0);