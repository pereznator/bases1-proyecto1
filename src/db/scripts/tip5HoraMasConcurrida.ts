export const sqlTop5Horas = `
SELECT
    TIME(fecha_hora) AS Hora,
    COUNT(*) AS Votos
FROM voto
GROUP BY Hora
ORDER BY Votos DESC
LIMIT 5
;
`;

export interface topHora {
  hora: string;
  votos: number;
}