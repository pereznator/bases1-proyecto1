export const TABLAS = {
  DEPARTAMENTO: 'departamento',
  CARGO: 'cargo',
  PARTIDO: 'partido',
  MESA: 'mesa',
  CIUDADANO: 'ciudadano',
  CANDIDATO: 'candidato',
  VOTO: 'voto',
  TEMPORAL: 'temporal',
}

export const NOMBRES_ARCHIVOS = {
  CANDIDATOS: 'candidatos',
  CARGOS: 'cargos',
  CIUDADANOS: 'ciudadanos',
  DEPARTAMENTOS: 'departamentos',
  MESAS: 'mesas',
  PARTIDOS: 'partidos',
  VOTACIONES: 'votaciones',
};

export const INDICES_PARA_TEMPORALES = {
  DEPARTAMENTOS: 0,
  CARGOS: 1,
  PARTIDOS: 2,
  MESAS: 3,
  CIUDADANOS: 4,
  CANDIDATOS: 5,
  VOTACIONES: 6,
};

export const ENCABEZADOS = {
  CANDIDATOS: {
    idCandidato: 'id', nombresCandidato: 'nombres', fechaNacimientoCandidato: 'fecha_nacimiento', idPartido: 'partido_id', idCargo: 'cargo_id'
  },
  CARGOS: {
    idCargo: 'id', cargo: 'cargo'
  },
  CIUDADANOS: {
    dpi: 'DPI', nombreCiudadano: 'Nombre', apellidoCiudadano: 'Apellido', direccionCiudadano: 'Direccion', telefonoCiudadano: 'Telefono', edadCiudadano: 'Edad', generoCiudadano: 'Genero'
  },
  DEPARTAMENTOS: {
    idDepartamento: 'id', departamento: 'nombre'
  },
  MESAS: {
    idMesa: 'id_mesa', idDepartamento: 'id_departamento'
  },
  PARTIDOS: {
    idPartido: 'id_partido', nombrePartido: 'nombrePartido', siglasPartido: 'Siglas', fundacionPartido: 'Fundacion'
  },
  VOTACIONES: {
    idVoto: 'id_voto', idCandidato: 'id_candidato', dpi: 'dpi_ciudadano', idMesa: 'mesa_id', fechaHoraVoto: 'fecha_hora'
  }
};

export const FORMATO_FECHA = "DD/MM/YYYY";
export const FORMATO_FECHA_HORA = "DD/MM/YYYY HH:mm";
