export const sqlTop5Mesas = `
select
m.id as "mesa",
d.departamento as "departamento",
count(v.id) as "votos"
from mesa m 
join voto v on v.id_mesa = m.id 
join departamento d on d.id = m.id_departamento 
group by m.id 
order by count(v.id) desc 
limit 5;
`;