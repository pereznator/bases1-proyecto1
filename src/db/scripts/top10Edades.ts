export const sqlTop10Edades = `
select 
c.edad as "Edad",
count(c.dpi) as "Cantidad"
from ciudadano c 
join voto v on v.dpi = c.dpi 
group by c.edad
order by count(c.dpi) DESC 
limit 10;
`;

export interface TopEdad {
  edad: number;
  cantidad: number;
}