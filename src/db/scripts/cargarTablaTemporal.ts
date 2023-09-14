export const sqlCargarTablaTemporal = (registros: string) => {
  return `
  INSERT INTO temporal (
    tipo,
    id_departamento,
    departamento,
    id_mesa, id_cargo,
    cargo,
    id_partido,
    nombre_partido,
    siglas_partido,
    fundacion_partido,
    dpi,
    nombre_ciudadano,
    apellido_ciudadano,
    direccion_ciudadano,
    telefono_ciudadano,
    edad_ciudadano,
    genero_ciudadano,
    id_candidato,
    nombres_candidato,
    fecha_nacimiento_candidato,
    id_voto,
    fecha_hora_voto
  )
  VALUES
  ${registros}
  ;`;
};
