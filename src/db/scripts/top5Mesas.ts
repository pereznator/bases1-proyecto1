export const sqlTop5Mesas = `
select
m.id as "Mesa",
d.departamento as "Departamento",
count(v.id) as "Votos"
from mesa m 
join voto v on v.id_mesa = m.id 
join departamento d on d.id = m.id_departamento 
group by m.id 
order by count(v.id) desc 
limit 5;
`;

export interface TopMesas {
  mesa: string;
  departamento: string;
  votos: number;
}
