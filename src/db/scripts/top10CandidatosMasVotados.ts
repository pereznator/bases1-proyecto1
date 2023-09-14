export const sqlTop10PresidentesMasVotados = `
select
presidente.nombres as "Presidente",
vicepresidente.nombres as "Vicepresidente",
count(v.id) as "Votos"
from voto v 
join detalle_voto dv on dv.id_voto = v.id 
join candidato presidente on presidente.id = dv.id_candidato 
join cargo cargoPresidente on cargoPresidente.id = presidente.id_cargo and cargoPresidente.cargo = 'presidente'
join partido p on p.id = presidente.id_partido 
join candidato vicepresidente on vicepresidente.id_partido = p.id 
join cargo cargoVicepresidente on cargoVicepresidente.id = vicepresidente.id_cargo and cargoVicepresidente.cargo = 'vicepresidente'
group by presidente.nombres, vicepresidente.nombres 
order by count(v.id) DESC 
limit 10;
`;

export interface TopPresidentesVotados {
  presidente: string;
  vicePresidente: string;
  votos: number;
}
