export const sqlListarPresidentesYVicepresidentes = `
select c1.nombres as "Presidente", c2.nombres as "Vicepresidente", p.nombre as "Partido"
from partido p 
join candidato c1 on c1.id_partido = p.id 
join cargo ca1 on ca1.id = c1.id_cargo and ca1.cargo = 'presidente'
join candidato c2 on c2.id_partido = p.id 
join cargo ca2 on ca2.id = c2.id_cargo and ca2.cargo = 'vicepresidente'
;
`;

export interface PresidentesYVicepresidentes {
  presidente: string;
  vicepresidente: string;
  partido: string;
}