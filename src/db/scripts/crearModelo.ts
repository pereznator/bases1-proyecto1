export const sqlCrearModelo = `
-- SQLINES DEMO *** le SQL Developer Data Modeler 23.1.0.087.0806
-- SQLINES DEMO *** -08-20 16:43:00 CST
-- SQLINES DEMO *** le Database 11g
-- SQLINES DEMO *** le Database 11g



-- SQLINES DEMO *** no DDL - MDSYS.SDO_GEOMETRY

-- SQLINES DEMO *** no DDL - XMLTYPE

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE candidato (
    id               INTEGER NOT NULL,
    nombres          VARCHAR(225) NOT NULL,
    fecha_nacimiento DATETIME NOT NULL,
    id_partido       INTEGER NOT NULL,
    id_cargo         INTEGER NOT NULL
);

ALTER TABLE candidato ADD CONSTRAINT candidato_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE cargo (
    id    INTEGER NOT NULL,
    cargo VARCHAR(225) NOT NULL
);

ALTER TABLE cargo ADD CONSTRAINT cargo_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE ciudadano (
    dpi       INTEGER NOT NULL,
    nombre    VARCHAR(225) NOT NULL,
    apellido  VARCHAR(225) NOT NULL,
    direccion VARCHAR(225) NOT NULL,
    telefono  VARCHAR(225) NOT NULL,
    edad      INTEGER NOT NULL,
    genero    CHAR(1) NOT NULL
);

ALTER TABLE ciudadano ADD CONSTRAINT ciudadano_pk PRIMARY KEY ( dpi );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE departamento (
    id           INTEGER NOT NULL,
    departamento VARCHAR(250) NOT NULL
);

ALTER TABLE departamento ADD CONSTRAINT departamento_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE mesa (
    id              INTEGER NOT NULL,
    id_departamento INTEGER NOT NULL
);

ALTER TABLE mesa ADD CONSTRAINT mesa_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE partido (
    id        INTEGER NOT NULL,
    nombre    VARCHAR(225) NOT NULL,
    siglas    VARCHAR(225) NOT NULL,
    fundacion DATETIME NOT NULL
);

ALTER TABLE partido ADD CONSTRAINT partido_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE temporal (
    id                         INTEGER NOT NULL,
    tipo                       VARCHAR(225) NOT NULL,
    id_departamento            INTEGER,
    departamento               VARCHAR(225),
    id_mesa                    INTEGER,
    id_cargo                   INTEGER,
    cargo                      VARCHAR(225),
    id_partido                 INTEGER,
    nombre_partido             VARCHAR(225),
    siglas_partido             VARCHAR(225),
    fundacion_partido          DATETIME,
    dpi                        INTEGER,
    nombre_ciudadano           VARCHAR(225),
    apellido_ciudadano         VARCHAR(225),
    direccion_ciudadano        VARCHAR(225),
    telefono_ciudadano         VARCHAR(225),
    edad_ciudadano             INTEGER,
    genero_ciudadano           CHAR(1),
    id_candidato               INTEGER,
    nombres_candidato          VARCHAR(225),
    fecha_nacimiento_candidato DATETIME,
    id_voto                    INTEGER,
    fecha_hora_voto            DATETIME(6)
);

ALTER TABLE temporal ADD CONSTRAINT temporal_pk PRIMARY KEY ( id );

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE voto (
    id_candidato INTEGER NOT NULL,
    dpi          INTEGER NOT NULL,
    id_mesa      INTEGER NOT NULL,
    fecha_hora   DATETIME(6) NOT NULL
);

ALTER TABLE voto ADD CONSTRAINT voto_pk PRIMARY KEY ( id_candidato,
                                                      dpi );

ALTER TABLE candidato
    ADD CONSTRAINT candidato_cargo_fk FOREIGN KEY ( id_cargo )
        REFERENCES cargo ( id )
            ON DELETE CASCADE;

ALTER TABLE candidato
    ADD CONSTRAINT id_partido FOREIGN KEY ( id_partido )
        REFERENCES partido ( id )
            ON DELETE CASCADE;

ALTER TABLE mesa
    ADD CONSTRAINT mesa_departamento_fk FOREIGN KEY ( id_departamento )
        REFERENCES departamento ( id )
            ON DELETE CASCADE;

ALTER TABLE voto
    ADD CONSTRAINT voto_candidato_fk FOREIGN KEY ( id_candidato )
        REFERENCES candidato ( id );

ALTER TABLE voto
    ADD CONSTRAINT voto_ciudadano_fk FOREIGN KEY ( dpi )
        REFERENCES ciudadano ( dpi )
            ON DELETE CASCADE;

ALTER TABLE voto
    ADD CONSTRAINT voto_mesa_fk FOREIGN KEY ( id_mesa )
        REFERENCES mesa ( id )
            ON DELETE CASCADE;


ALTER TABLE elecciones.temporal MODIFY COLUMN id int auto_increment NOT NULL;


-- SQLINES DEMO *** per Data Modeler Summary Report: 
-- 
-- SQLINES DEMO ***                         8
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                        14
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO *** DY                      0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         1
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***  TYPE                   0
-- SQLINES DEMO ***  TYPE                   0
-- SQLINES DEMO ***  TYPE BODY              0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO *** EGMENT                  0
-- SQLINES DEMO ***                         1
-- SQLINES DEMO *** ED VIEW                 0
-- SQLINES DEMO *** ED VIEW LOG             0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- 
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0
-- 
-- SQLINES DEMO ***                         0
-- 
-- SQLINES DEMO ***                         0
-- SQLINES DEMO *** A                       0
-- SQLINES DEMO *** T                       0
-- 
-- SQLINES DEMO ***                         0
-- SQLINES DEMO ***                         0

`;