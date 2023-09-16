export const sqlVotosPorGener = `
select 
c.genero as Genero,
count(v.id) as Votos
from ciudadano c 
join voto v on v.dpi = c.dpi 
group by Genero ;
`;

export interface VotosPorGenero {
  genero: string;
  votos: number;
}