export const sqlNumeroDeCandidatosPorPartido = `
select 
p.nombre as "Partido",
count(c.id) as "Candidatos"
from partido p 
join candidato c on c.id_partido = p.id
group by p.nombre 
;
`;

export interface NumeroDeCandidatosPorPartido {
  partido: string;
  candidatos: number;
}