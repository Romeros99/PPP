--Creación de las tablas
CREATE TABLE Alumnos(
    RUN_Alumno VARCHAR(12) NOT NULL,
    Nombres VARCHAR(64),
    Apellidos VARCHAR(64),
    Mail_UAI VARCHAR(35),
    Mail_Personal VARCHAR(35),
    Clave VARCHAR(30),
    PRIMARY KEY (RUN_Alumno)
);

CREATE TABLE Administradores(
    RUN_Administrador VARCHAR(12) NOT NULL,
    Nombres VARCHAR(64),
    Apellidos VARCHAR(64),
    Mail_UAI VARCHAR(35),
    Clave VARCHAR(30),
    PRIMARY KEY (RUN_Administrador)
);

--Inserción de primeros registros de prueba
INSERT INTO Alumnos(RUN_Alumno, Nombres, Apellidos, Mail_UAI, Mail_Personal, Clave)
VALUES
    ('19.248.635-1', 'Juan Luis', 'Perez Rodríguez', 'juanluperez@alumnos.uai.cl', 'jlprodriguez@gmail.com', 'KrooamLPA'),
    ('20.648.241-4', 'Santiago', 'Silva Lopez', 'santiasilva@alumnos.uai.cl', 'santisilva123@hotmail.com', 'Clave2'),
    ('20.358.429-6', 'Federico Andrés', 'Gómez Marchesse', 'fedgomez@alumnos.uai.cl', 'federicogomez99@gmail.com', 'EstaClaveNadieLaAdivina');

INSERT INTO Administradores(RUN_Administrador, Nombres, Apellidos, Mail_UAI, Clave)
VALUES
    ('9.110.841-0', 'José Miguel', 'Pulido Pérez', 'josempulido@uai.cl', 'Gato123123'),
    ('15.824.291-5', 'Rodrigo', 'Diaz Diaz', 'rodrdiazd@uai.cl', 'ContraseñaSecreta'),
    ('24.305.277-7', 'Charles', 'Aranguiz Sotomayor', 'charlesaranguiz@uai.cl', 'CharlesAranguiz1969');
