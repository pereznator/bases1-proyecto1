export const sqlCantidadVotosNulos = `
select COUNT(*) as "VotosNulos"
from voto v 
join detalle_voto dv ON dv.id_voto = v.id 
where dv.id_candidato = -1
;
`;
export interface VotosNulos {
  votosNulos: number;
}