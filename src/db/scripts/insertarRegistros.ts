import { TABLAS } from "../../shared/utils/constants";

export const sqlInsertarRegistros = (indice: number, values: string): string => {
  return `
  INSERT INTO ${Object.values(TABLAS)[indice]} (${ATRIBUTOS[indice]}) VALUES ${values};
  `;
}

const ATRIBUTOS = [
  "id, departamento",
  "id, cargo",
  "id, nombre, siglas, fundacion",
  "id, id_departamento",
  "dpi, nombre, apellido, direccion, telefono, edad, genero",
  "id, nombres, fecha_nacimiento, id_partido, id_cargo",
  "id, dpi, id_mesa, fecha_hora",
  "id_voto, id_candidato",
];