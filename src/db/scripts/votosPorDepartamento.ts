export const sqlVotosPorDepartamento = `
select 
d.departamento as "Departamento",
count(v.id) as "Votos"
from departamento d 
join mesa m on m.id_departamento = d.id 
join voto v on v.id_mesa = m.id 
group by d.departamento
;
`;

export interface VotosPorDepartamento {
  departamento: string;
  votos: number;
}