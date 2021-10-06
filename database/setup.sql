CREATE TABLE IF NOT EXISTS Roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE KEY,
    description NVARCHAR(200) NOT NULL
);

INSERT INTO Roles(code, description) VALUES
('ROOT', 'Usuario root'),
('ADMIN', 'Usuario administrador'),
('BASIC', 'Usuario con los permisos básicos');

CREATE TABLE IF NOT EXISTS Permissions(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    code NVARCHAR(50) NOT NULL UNIQUE KEY,
    description NVARCHAR(200) NOT NULL
);

INSERT INTO Permissions(code, description) VALUES
('ALL', 'Permiso absoluto'),
('U_DATA', 'Actualización de información cultural'),
('U_PERSONAL_INFO', 'Actualización de información personal'),
('U_COMMUNITY_INFO', 'Actualización de información de un pueblo'),
('CRUD_USER_BASIC', 'CRUD de usuarios básicos'),
('CRUD_USER_ADMIN', 'CRUD de usario administradores'),
('CRUD_COMMUNITY_INFO', 'CRUD de información de un pueblo');

CREATE TABLE IF NOT EXISTS PermissionsByRol(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rol_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY(rol_id) REFERENCES Roles(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY(permission_id) REFERENCES Permissions(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO PermissionsByRol(rol_id, permission_id) VALUES
(1, 1),
(2, 2),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(3, 2),
(3, 3);

CREATE TABLE IF NOT EXISTS StatusUsers(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    value NVARCHAR(50) NOT NULL UNIQUE KEY
);

INSERT INTO StatusUsers(value) VALUES
('CREATED'), ('ACTIVE'), ('INACTIVE');

CREATE TABLE IF NOT EXISTS Users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username NVARCHAR(40) NOT NULL UNIQUE KEY,
    password TEXT NOT NULL,
    name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(150) NOT NULL,
    phone NVARCHAR(12) NULL,
    url_profile NVARCHAR(150) NULL,
    status NVARCHAR(50) NOT NULL DEFAULT 'CREATED',
    rol_id INT NOT NULL,
    FOREIGN KEY(status) REFERENCES StatusUsers(value) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY(rol_id) REFERENCES Roles(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO Users(username, password, name, last_name, status, rol_id) VALUES
('root', '63a9f0ea7bb98050796b649e85481845', 'Rafael', 'Cano Martínez', 'ACTIVE', 1);