export const sqlListarNombresDeAlcaldes = `
select 
p.nombre as "Partido",
c.nombres as "Alcalde" 
from partido p 
join candidato c ON c.id_partido = p.id 
join cargo ca on ca.id = c.id_cargo 
where ca.cargo = 'alcalde';
`;

export interface AlcaldePorPartido {
  partido: string;
  alcalde: string;
}