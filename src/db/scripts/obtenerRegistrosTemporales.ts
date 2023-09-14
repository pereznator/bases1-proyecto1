export function sqlObtenerRegistrosTemporales(indice: number): string {
 // console.log(SELECT_ATTRIBUTES[indice]);
  return `
  SELECT ${SELECT_ATTRIBUTES[indice]} FROM temporal t WHERE t.tipo = ${indice};
  `;
};

const SELECT_ATTRIBUTES = [
  "id_departamento AS \"id\", departamento",
  "id_cargo AS \"id\", cargo",
  "id_partido AS \"id\", nombre_partido AS \"nombre\", siglas_partido AS \"siglas\", fundacion_partido AS \"fundacion\"",
  "id_mesa AS \"id\", id_departamento",
  "dpi, nombre_ciudadano AS \"nombre\", apellido_ciudadano AS \"apellido\", telefono_ciudadano AS \"telefono\", edad_ciudadano AS \"edad\", genero_ciudadano AS \"genero\", direccion_ciudadano AS \"direccion\"",
  "id_candidato AS \"id\", nombres_candidato AS \"nombre\", fecha_nacimiento_candidato AS \"fecha_nacimiento\", id_partido, id_cargo",
  "id_voto AS \"id\", dpi, id_candidato, id_mesa, fecha_hora_voto AS \"fecha_hora\"",
];
