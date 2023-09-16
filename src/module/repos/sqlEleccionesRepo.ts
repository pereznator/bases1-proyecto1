import { database } from "../../db/database";
import { VotosNulos, sqlCantidadVotosNulos } from "../../db/scripts/cantidadVotosNulos";
import { AlcaldePorPartido, sqlListarNombresDeAlcaldes } from "../../db/scripts/listarNombresDeAlcaldes";
import { NumeroDeDiputadosPorPartido, sqlNumeroDeDiputadosPorPartido } from "../../db/scripts/listarNumeroDeDiputadosPorPartido";
import { PresidentesYVicepresidentes, sqlListarPresidentesYVicepresidentes } from "../../db/scripts/listarPresidentesYVicepresidentes";
import { NumeroDeCandidatosPorPartido, sqlNumeroDeCandidatosPorPartido } from "../../db/scripts/numeroDeCandidatosPorPartido";
import { sqlTop5Horas, topHora } from "../../db/scripts/tip5HoraMasConcurrida";
import { TopPresidentesVotados, sqlTop10PresidentesMasVotados } from "../../db/scripts/top10CandidatosMasVotados";
import { TopEdad, sqlTop10Edades } from "../../db/scripts/top10Edades";
import { TopMesas, sqlTop5Mesas } from "../../db/scripts/top5Mesas";
import { VotosPorDepartamento, sqlVotosPorDepartamento } from "../../db/scripts/votosPorDepartamento";
import { VotosPorGenero, sqlVotosPorGener } from "../../db/scripts/votosPorGenero";

class SqlEleccionesRepo {
  async listartPresidentesYVicepresidentesPorPartido(): Promise<PresidentesYVicepresidentes[]> {
    const respuesta = await database.connection.query(sqlListarPresidentesYVicepresidentes);
    const lista: PresidentesYVicepresidentes[] = Object.values(respuesta[0]).map(record => {
      const formato: PresidentesYVicepresidentes = {
        presidente: record.Presidente,
        vicepresidente: record.Vicepresidente,
        partido: record.Partido
      };
      return formato;
    });
    return lista;
  }
  
  async listarNumeroDeDiputadosPorPartido(): Promise<NumeroDeDiputadosPorPartido[]> {
    const respuesta = await database.connection.query(sqlNumeroDeDiputadosPorPartido);
    const lista: NumeroDeDiputadosPorPartido[] = Object.values(respuesta[0]).map(record => {
      const formato: NumeroDeDiputadosPorPartido = {
        partido: record.Partido,
        diputados: record.Diputados
      };
      return formato;
    });
    return lista;
  }

  async listarNumeroDeCandidatosPorPartido(): Promise<NumeroDeCandidatosPorPartido[]> {
    const respuesta = await database.connection.query(sqlNumeroDeCandidatosPorPartido);
    const lista: NumeroDeCandidatosPorPartido[] = Object.values(respuesta[0]).map(record => {
      const formato: NumeroDeCandidatosPorPartido = {
        partido: record.Partido,
        candidatos: record.Candidatos
      };
      return formato;
    });
    return lista;
  }
  
  async listarAlcaldesPorPartido(): Promise<AlcaldePorPartido[]> {
    const respuesta = await database.connection.query(sqlListarNombresDeAlcaldes);
    const lista: AlcaldePorPartido[] = Object.values(respuesta[0]).map(record => {
      const formato: AlcaldePorPartido = {
        partido: record.Partido,
        alcalde: record.Alcalde
      };
      return formato;
    });
    return lista;
  }
  async listarVotosPorDepartamento(): Promise<VotosPorDepartamento[]> {
    const respuesta = await database.connection.query(sqlVotosPorDepartamento);
    const lista: VotosPorDepartamento[] = Object.values(respuesta[0]).map(record => {
      const formato: VotosPorDepartamento = {
        departamento: record.Departamento,
        votos: record.Votos
      };
      return formato;
    });
    return lista;
  }
  
  async listarVotosNulos(): Promise<VotosNulos> {
    const respuesta = await database.connection.query(sqlCantidadVotosNulos);
    const lista: VotosNulos[] = Object.values(respuesta[0]).map(record => {
      const formato: VotosNulos = {
        votosNulos: record.VotosNulos
      };
      return formato;
    });
    return lista[0];
  }
  
  async listarTop10Edades(): Promise<TopEdad[]> {
    const respuesta = await database.connection.query(sqlTop10Edades);
    const lista: TopEdad[] = Object.values(respuesta[0]).map(record => {
      const formato: TopEdad = {
        edad: record.Edad,
        cantidad: record.Cantidad
      };
      return formato;
    });
    return lista;
  }
  
  async listarTop10PresidentesMasVotados(): Promise<TopPresidentesVotados[]> {
    const respuesta = await database.connection.query(sqlTop10PresidentesMasVotados);
    const lista: TopPresidentesVotados[] = Object.values(respuesta[0]).map(record => {
      const formato: TopPresidentesVotados = {
        presidente: record.Presidente,
        vicePresidente: record.Vicepresidente,
        votos: record.Votos
      };
      return formato;
    });
    return lista;
  }
  
  async listarTop5Mesas(): Promise<TopMesas[]> {
    const respuesta = await database.connection.query(sqlTop5Mesas);
    const lista: TopMesas[] = Object.values(respuesta[0]).map(record => {
      const formato: TopMesas = {
        mesa: record.Mesa,
        departamento: record.Departamento,
        votos: record.Votos
      };
      return formato;
    });
    return lista;
  }
  
  async listarTop5Horas(): Promise<topHora[]> {
    const respuesta = await database.connection.query(sqlTop5Horas);
    const lista: topHora[] = Object.values(respuesta[0]).map(record => {
      const formato: topHora = {
        hora: record.Hora,
        votos: record.Votos
      };
      return formato;
    });
    return lista;
  }
  
  async listarVotosPorGenero(): Promise<VotosPorGenero[]> {
    const respuesta = await database.connection.query(sqlVotosPorGener);
    const lista: VotosPorGenero[] = Object.values(respuesta[0]).map(record => {
      const formato: VotosPorGenero = {
        genero: record.Genero,
        votos: record.Votos
      };
      return formato;
    });
    return lista;
  }



}

export const sqlEleccionesRepo = new SqlEleccionesRepo();
