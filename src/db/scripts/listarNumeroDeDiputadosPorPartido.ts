export const sqlNumeroDeDiputadosPorPartido = `
select 
p.nombre as "Partido",
count(c.id) as "Diputados"
from partido p 
join candidato c on c.id_partido = p.id
join cargo c2 on c2.id = c.id_cargo 
where c2.cargo in ('diputado congreso lista nacional', 'diputado congreso distrito electoral', 'diputado parlamento centroamericano')
group by p.nombre 
;
`;

export interface NumeroDeDiputadosPorPartido {
  partido: string;
  diputados: number;
}