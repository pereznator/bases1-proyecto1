import { database } from "../../db/database";
import { sqlEliminarTabla } from "../../db/scripts/eliminarTablas";
import { sqlCrearModelo } from "../../db/scripts/crearModelo";
import { ENCABEZADOS, FORMATO_FECHA, FORMATO_FECHA_HORA, INDICES_PARA_TEMPORALES, NOMBRES_ARCHIVOS, TABLAS } from "../../shared/utils/constants";
import path from "path";
import { parse } from "fast-csv";
import * as fs from "fs";
import { ITemporalProps, Temporal } from "../domain/temporal";
import { sqlCargarTablaTemporal } from "../../db/scripts/cargarTablaTemporal";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import moment from "moment";
import { Departamento } from "../domain/departamento";
import { sqlObtenerRegistrosTemporales } from "../../db/scripts/obtenerRegistrosTemporales";
import { Cargo } from "../domain/cargo";
import { Partido } from '../domain/partido';
import { Mesa } from "../domain/mesa";
import { Ciudadano } from "../domain/ciudadano";
import { Candidato } from "../domain/candidato";
import { Voto } from "../domain/voto";
import { sqlInsertarRegistros } from "../../db/scripts/insertarRegistros";
import { DetalleVoto } from "../domain/detalleVoto";

class ConfigRepo {
  async crearModelo(): Promise<any> {
    //const filePath = path.join(__dirname, "..", "..", "..", "src", "db", "scripts", "db.ddl");
    //"../../db/scripts/db.ddl";
    const sqlCommands = sqlCrearModelo.replace("\n", "").split(";");
    for (let command of sqlCommands) {
      if (command.trim() !== "") {
        await database.connection.query(command);
        //console.log("[Consulta]", command, consulta);
      }
    }
  }

  async eliminarModelo(): Promise<any> {
    const tablas = Object.values(TABLAS);
    for (let index = tablas.length - 1; index >= 0; index--) {
      const tabla = tablas[index];
      const sqlCommands = sqlEliminarTabla(tabla).split(";");
      for (const command of sqlCommands) {
        if (command !== '\n') {
          await database.connection.query(command);
        }
      }
    }
    //return result;
  }

  async cargarATablaTemporal(): Promise<void> {
    const registrosTemporales: Temporal[] = [];
    const registrosTemporalesConError = [];
    const dataFolder = path.resolve(__dirname, "..", "..", "..", "data");
    await Promise.all(Object.values(NOMBRES_ARCHIVOS).map(async (nombreArchivo) => {
      await new Promise((res, reject) => {
        const filePath = path.join(dataFolder, `${nombreArchivo}.csv`);
        const tipo = nombreArchivo.toUpperCase();
        const tipoIndice = INDICES_PARA_TEMPORALES[tipo];
        fs.createReadStream(filePath)
          .pipe(parse({ headers: true, delimiter: ',' }))
          .on("data", (row: any) => {
            const tempProps: ITemporalProps = {
              tipo: tipoIndice,
              idDepartamento: row[ENCABEZADOS[tipo]["idDepartamento"]] ? new UniqueEntityID(Number(row[ENCABEZADOS[tipo]["idDepartamento"]])) : null,
              departamento: row[ENCABEZADOS[tipo]["departamento"]] ?? null,
              idMesa: row[ENCABEZADOS[tipo]["idMesa"]] ? new UniqueEntityID(Number(row[ENCABEZADOS[tipo]["idMesa"]])) : null,
              idCargo: row[ENCABEZADOS[tipo]["idCargo"]] ? new UniqueEntityID(Number(row[ENCABEZADOS[tipo]["idCargo"]])) : null,
              cargo: row[ENCABEZADOS[tipo]["cargo"]] ?? null,
              idPartido: row[ENCABEZADOS[tipo]["idPartido"]] ? new UniqueEntityID(row[ENCABEZADOS[tipo]["idPartido"]]) : null,
              nombrePartido: row[ENCABEZADOS[tipo]["nombrePartido"]] ?? null,
              siglasPartido: row[ENCABEZADOS[tipo]["siglasPartido"]] ?? null,
              fundacionPartido: row[ENCABEZADOS[tipo]["fundacionPartido"]] ? new Date(moment.utc(row[ENCABEZADOS[tipo]["fundacionPartido"]]).toISOString()) : null,
              dpi: row[ENCABEZADOS[tipo]["dpi"]] ? new UniqueEntityID(row[ENCABEZADOS[tipo]["dpi"]]) : null,
              nombreCiudadano: row[ENCABEZADOS[tipo]["nombreCiudadano"]] ?? null,
              apellidoCiudadano: row[ENCABEZADOS[tipo]["apellidoCiudadano"]] ?? null,
              direccionCiudadano: row[ENCABEZADOS[tipo]["direccionCiudadano"]] ?? null,
              telefonoCiudadano: row[ENCABEZADOS[tipo]["telefonoCiudadano"]] ?? null,
              edadCiudadano: row[ENCABEZADOS[tipo]["edadCiudadano"]] ?? null,
              generoCiudadano: row[ENCABEZADOS[tipo]["generoCiudadano"]] ?? null,
              idCandidato: row[ENCABEZADOS[tipo]["idCandidato"]] ? new UniqueEntityID(Number(row[ENCABEZADOS[tipo]["idCandidato"]])) : null,
              nombresCandidato: row[ENCABEZADOS[tipo]["nombresCandidato"]] ?? null,
              fechaNacimientoCandidato: row[ENCABEZADOS[tipo]["fechaNacimientoCandidato"]] ? new Date(moment.utc(row[ENCABEZADOS[tipo]["fechaNacimientoCandidato"]], FORMATO_FECHA).toISOString()) : null,
              idVoto: row[ENCABEZADOS[tipo]["idVoto"]] ? new UniqueEntityID(Number(row[ENCABEZADOS[tipo]["idVoto"]])) : null,
              fechaHoraVoto: row[ENCABEZADOS[tipo]["fechaHoraVoto"]] ? new Date(moment.utc(row[ENCABEZADOS[tipo]["fechaHoraVoto"]], FORMATO_FECHA_HORA).toISOString()) : null,
            };
            const tempResult = Temporal.create(tempProps);
            if (tempResult.isSuccess) {
              registrosTemporales.push(tempResult.getValue());
            } else {
              registrosTemporalesConError.push(tempProps);
            }
          })
          .on("end", () => {
            res(true);
          })
          .on("error", (err) => {
            reject(err);
          });
      });
    }));
    const registrosString = registrosTemporales.map(registro => registro.toRaw()).join(",\n");
    await database.connection.query(sqlCargarTablaTemporal(registrosString));
  }

  async cargarTablas(): Promise<void> {
    const departamentos = await this.obtenerDepartamentosDeTablaTemporal();
    await this.crearDepartamentos(departamentos);
    const cargos = await this.obtenerCargosDeTablaTemporal();
    await this.crearCargos(cargos);
    const partidos = await this.obtenerPartidosDeTablaTemporal();
    await this.crearPartidos(partidos);
    const mesas = await this.obtenerMesasDeTablaTemporal();
    await this.crearMesas(mesas);
    const ciudadanos = await this.obtenerCiudadanosDeTablaTemporal();
    await this.crearCiudadanos(ciudadanos);
    const candidatos = await this.obtenerCandidatosDeTablaTemporal();
    await this.crearCandidatos(candidatos);
    const votos = await this.obtenerVotosDeTablaTemporal();

    const votosPorId = {};
    votos.map(voto => {
      if (votosPorId[voto.id.toValue()]) {
        votosPorId[voto.id.toValue()].push(voto);
      } else {
        votosPorId[voto.id.toValue()] = [voto];
      }
    });

    const detalles: DetalleVoto[] = [];
    const votosAIngresar: Voto[] = [];

    const votosOrdenados = Object.values(votosPorId);
    votosOrdenados.map((votosHechosPorPersona: Voto[]) => {
      votosAIngresar.push(votosHechosPorPersona[0]);
      votosHechosPorPersona.map((voto: Voto) => {
        const detalle = DetalleVoto.create({
          votoId: voto.id,
          candidatoId: voto.props.candidatoId
        }, new UniqueEntityID());
        detalles.push(detalle.getValue());
      });
    });

    await this.crearVotos(votosAIngresar);

    await this.crearDetallesVotos(detalles);
  }

  async obtenerDepartamentosDeTablaTemporal(): Promise<Departamento[]> {
    const script = sqlObtenerRegistrosTemporales(INDICES_PARA_TEMPORALES.DEPARTAMENTOS);
    const departamentosDB = await database.connection.query(script);
    const departamentos: Departamento[] = Object.values(departamentosDB[0]).map((dep: any) => Departamento.toDomain(dep));
    return departamentos;
  }

  async crearDepartamentos(departamentos: Departamento[]): Promise<any> {
    const departamentosRaw = departamentos.map(departamento => Departamento.toRaw(departamento)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.DEPARTAMENTOS, departamentosRaw);
    await database.connection.query(sql);
  }
  
  async obtenerCargosDeTablaTemporal(): Promise<Cargo[]> {
    const script = sqlObtenerRegistrosTemporales(INDICES_PARA_TEMPORALES.CARGOS);
    const cargosDB = await database.connection.query(script);
    const cargos: Cargo[] = Object.values(cargosDB[0]).map((cargo: any) => Cargo.toDomain(cargo));
    return cargos;
  }

  async crearCargos(cargos: Cargo[]): Promise<any> {
    const cargosRaw = cargos.map(cargo => Cargo.toRaw(cargo)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.CARGOS, cargosRaw);
    await database.connection.query(sql);
  }

  async obtenerPartidosDeTablaTemporal(): Promise<Partido[]> {
    const script = sqlObtenerRegistrosTemporales(INDICES_PARA_TEMPORALES.PARTIDOS);
    const partidosDB = await database.connection.query(script);
    const partidos: Partido[] = Object.values(partidosDB[0]).map((partido: any) => Partido.toDomain(partido));
    return partidos;
  }

  async crearPartidos(partidos: Partido[]): Promise<any> {
    const partidosRaw = partidos.map(partido => Partido.toRaw(partido)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.PARTIDOS, partidosRaw);
    await database.connection.query(sql);
  }
  
  async obtenerMesasDeTablaTemporal(): Promise<Mesa[]> {
    const script = sqlObtenerRegistrosTemporales(INDICES_PARA_TEMPORALES.MESAS);
    const mesasDB = await database.connection.query(script);
    const mesas: Mesa[] = Object.values(mesasDB[0]).map((mesa: any) => Mesa.toDomain(mesa));
    return mesas;
  }

  async crearMesas(mesas: Mesa[]): Promise<any> {
    const mesasRaw = mesas.map(mesa => Mesa.toRaw(mesa)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.MESAS, mesasRaw);
    await database.connection.query(sql);
  }
  
  async obtenerCiudadanosDeTablaTemporal(): Promise<Ciudadano[]> {
    const script = sqlObtenerRegistrosTemporales(INDICES_PARA_TEMPORALES.CIUDADANOS);
    const ciudadanosDB = await database.connection.query(script);
    const ciudadanos: Ciudadano[] = Object.values(ciudadanosDB[0]).map((ciudadano: any) => Ciudadano.toDomain(ciudadano));
    return ciudadanos;
  }

  async crearCiudadanos(ciudadanos: Ciudadano[]): Promise<any> {
    const ciudadanosRaw = ciudadanos.map(ciudadano => Ciudadano.toRaw(ciudadano)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.CIUDADANOS, ciudadanosRaw);
    await database.connection.query(sql);
  }
  
  async obtenerCandidatosDeTablaTemporal(): Promise<Candidato[]> {
    const script = sqlObtenerRegistrosTemporales(INDICES_PARA_TEMPORALES.CANDIDATOS);
    const candidatosDB = await database.connection.query(script);
    const candidatos: Candidato[] = Object.values(candidatosDB[0]).map((candidato: any) => Candidato.toDomain(candidato));
    return candidatos;
  }

  async crearCandidatos(candidatos: Candidato[]): Promise<any> {
    const candidatosRaw = candidatos.map(candidato => Candidato.toRaw(candidato)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.CANDIDATOS, candidatosRaw);
    await database.connection.query(sql);
  }
  
  async obtenerVotosDeTablaTemporal(): Promise<Voto[]> {
    const script = sqlObtenerRegistrosTemporales(INDICES_PARA_TEMPORALES.VOTACIONES);
    const votosDB = await database.connection.query(script);
    const votos: Voto[] = Object.values(votosDB[0]).map((voto: any) => Voto.toDomain(voto));
    return votos;
  }

  async crearVotos(votos: Voto[]): Promise<any> {
    const votosRaw = votos.map(voto => Voto.toRaw(voto)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.VOTACIONES, votosRaw);
    await database.connection.query(sql);
  }
  
  async crearDetallesVotos(detalles: DetalleVoto[]): Promise<any> {
    const detallesRaw = detalles.map(detalle => DetalleVoto.toRaw(detalle)).join(",\n");
    const sql = sqlInsertarRegistros(INDICES_PARA_TEMPORALES.DETALLES_VOTOS, detallesRaw);
    await database.connection.query(sql);
  }

}

export const configRepo = new ConfigRepo();
