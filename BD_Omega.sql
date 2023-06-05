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
    ('19.436.418-0', 'Nicolás Adolfo', 'Gómez Marchesse', 'nicogomezm@alumnos.uai.com', 'nicogomezm@gmail.com', 'elnico1'),
    ('19.248.635-1', 'Juan Luis', 'Perez Rodríguez', 'juanluperez@alumnos.uai.cl', 'jlprodriguez@gmail.com', 'KrooamLPA'),
    ('20.648.241-4', 'Santiago', 'Silva Lopez', 'santiasilva@alumnos.uai.cl', 'santisilva123@hotmail.com', 'Clave2'),
    ('20.358.429-6', 'Federico Andrés', 'Gómez Marchesse', 'fedgomez@alumnos.uai.cl', 'federicogomez99@gmail.com', 'EstaClaveNadieLaAdivina'),
    ('18.912.345-6', 'Juan Carlos', 'Pérez González', 'juancarlosperez@alumnos.uai.cl', 'juanperez@gmail.com', 'perro123'),
    ('20.987.654-3', 'María Fernanda', 'Torres López', 'mariafernandatorres@alumnos.uai.cl', 'mftorres@hotmail.com', 'gato456'),
    ('19.567.890-1', 'Pablo Andrés', 'Silva Rodríguez', 'pabloandressilva@alumnos.uai.cl', 'pablosilva@gmail.com', 'sol789'),
    ('21.234.567-9', 'Carolina Paz', 'Muñoz Morales', 'carolinapazmunoz@alumnos.uai.cl', 'cpmunoz@hotmail.com', 'casa2022'),
    ('18.765.432-0', 'José Miguel', 'Gutiérrez Sánchez', 'josemiguelgutierrez@alumnos.uai.cl', 'jose.gutierrez@gmail.com', 'playa777'),
    ('20.112.233-4', 'Camila Andrea', 'Fernández Salazar', 'camilaandreafernandez@alumnos.uai.cl', 'camila.fernandez@gmail.com', 'pera567'),
    ('19.999.888-3', 'Alejandro Gabriel', 'Ramírez Torres', 'alejandrogabrielramirez@alumnos.uai.cl', 'alejandro.ramirez@hotmail.com', 'arbol888'),
    ('18.765.432-1', 'Valentina Paz', 'López Vera', 'valentinapazlopez@alumnos.uai.cl', 'valen.lopez@gmail.com', 'rosa123'),
    ('19.876.543-2', 'Felipe Ignacio', 'Ríos Silva', 'felipeignaciorios@alumnos.uai.cl', 'felipe.rios@hotmail.com', '2023sol'),
    ('22.123.456-7', 'Daniela Antonia', 'Castro Muñoz', 'danielaantoniacastro@alumnos.uai.cl', 'daniela.castro@gmail.com', 'sol123'),
    ('21.234.567-8', 'Cristian Andrés', 'Rojas Valenzuela', 'cristianandresrojas@alumnos.uai.cl', 'cristian.rojas@hotmail.com', 'guitarra456');

INSERT INTO Administradores(RUN_Administrador, Nombres, Apellidos, Mail_UAI, Clave)
VALUES
    ('9.110.841-0', 'José Miguel', 'Pulido Pérez', 'josempulido@uai.cl', 'Gato123123'),
    ('15.824.291-5', 'Rodrigo', 'Diaz Diaz', 'rodrdiazd@uai.cl', 'ContraseñaSecreta'),
    ('24.305.277-7', 'Charles', 'Aranguiz Sotomayor', 'charlesaranguiz@uai.cl', 'CharlesAranguiz1969'),
    ('23.987.654-3', 'Felipe Andrés', 'López Soto', 'felipeandreslopez@uai.cl', 'clave123'),
    ('10.123.456-7', 'María José', 'García Mendoza', 'mariajosegarcia@uai.cl', 'contrasena456'),
    ('9.876.543-2', 'Carlos Alberto', 'Silva Castro', 'carlosalbertosilva@uai.cl', 'password789'),
    ('8.765.432-1', 'Valentina Paz', 'Rojas Valdez', 'valentinarojas@uai.cl', 'secure123'),
    ('9.999.888-3', 'Javier Ignacio', 'Pérez Torres', 'javierperez@uai.cl', 'key456'),
    ('10.112.233-4', 'Daniela Antonia', 'Fuentes Ramírez', 'danielaantoniafuentes@uai.cl', 'access321'),
    ('8.765.432-0', 'Cristina Paz', 'Hernández Guzmán', 'cristinahernandez@uai.cl', 'code789'),
    ('23.876.543-2', 'Roberto Andrés', 'Muñoz Sánchez', 'robertomunoz@uai.cl', 'secretword123'),
    ('24.123.456-7', 'María Fernanda', 'Gutiérrez Silva', 'mariafernandagutierrez@uai.cl', 'key321'),
    ('23.234.567-8', 'Andrés Felipe', 'Vargas Rojas', 'andresvargas@uai.cl', 'pass123'),
    ('8.345.678-9', 'Camila Andrea', 'López Morales', 'camilalopez@uai.cl', 'open789'),
    ('24.456.789-0', 'Jorge Eduardo', 'Torres Muñoz', 'jorgetorres@uai.cl', 'access456');
