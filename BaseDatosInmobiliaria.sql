-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS inmuebles_db;
USE inmuebles_db;

-- Crear la tabla de zonas
CREATE TABLE IF NOT EXISTS zonas (
    idzona INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos en la tabla de zonas
INSERT INTO zonas (descripcion) VALUES
('Centro'),
('Norte'),
('Sur'),
('Este'),
('Oeste');

-- Crear la tabla de inmuebles
CREATE TABLE IF NOT EXISTS inmuebles (
    idinmuebles INT AUTO_INCREMENT PRIMARY KEY,
    domicilio VARCHAR(255) NOT NULL,
    zona INT NOT NULL,
    habitaciones INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (zona) REFERENCES zonas(idzona)
);

-- Insertar datos en la tabla de inmuebles
INSERT INTO inmuebles (domicilio, zona, habitaciones, precio) VALUES
('Calle A, 1', 1, 2, 100000),
('Calle B, 2', 2, 3, 150000),
('Calle C, 3', 3, 200000),
('Calle D, 4', 1, 250000),
('Calle E, 5', 2, 300000),
('Calle F, 1', 3, 350000),
('Calle G, 2', 1, 400000),
('Calle H, 3', 2, 450000),
('Calle I, 4', 3, 500000),
('Calle J, 5', 1, 550000);

-- Crear la tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
    idreserva INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(9) NOT NULL,
    inmueble INT NOT NULL,
    fecha DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inmueble) REFERENCES inmuebles(idinmuebles)
);

-- Insertar datos en la tabla de reservas
INSERT INTO reservas (dni, inmueble, fecha) VALUES
('12345678A', 1, '2024-08-05'),
('23456789B', 2, '2024-08-05'),
('34567890C', 3, '2024-08-05'),
('45678901D', 4, '2024-08-05'),
('56789012E', 5, '2024-08-05');
