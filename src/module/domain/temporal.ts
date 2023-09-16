import moment from 'moment';
import { Result } from '../../shared/core/result';
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { INDICES_PARA_TEMPORALES } from "../../shared/utils/constants";
import { Guard } from "../../shared/utils/guard";

export interface ITemporalProps {
  tipo: number;
  idDepartamento?: UniqueEntityID;
  departamento?: string;
  idMesa?:  UniqueEntityID;      
  idCargo?: UniqueEntityID;  
  cargo?: string;
  idPartido?: UniqueEntityID;     
  nombrePartido?: string;
  siglasPartido?: string;
  fundacionPartido?: Date;
  dpi?: UniqueEntityID;   
  nombreCiudadano?: string;
  apellidoCiudadano?: string;
  direccionCiudadano?: string;
  telefonoCiudadano?: string;
  edadCiudadano?: number;
  generoCiudadano?: string;
  idCandidato?: UniqueEntityID;
  nombresCandidato?: string;
  fechaNacimientoCandidato?: Date;
  idVoto?: UniqueEntityID;
  fechaHoraVoto?: Date;
}

export class Temporal extends Entity<ITemporalProps> {
  constructor(props: ITemporalProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ITemporalProps, id?: UniqueEntityID): Result<Temporal> {
    if (Guard.againstNullOrUndefined(props.tipo).isFailure) {
      return Result.fail("Cada registro temporal debe tener el atributo 'tipo' obligatoriamente.");
    }
    let validationResult: Result<any>;
    switch(props.tipo) {
      case INDICES_PARA_TEMPORALES.CANDIDATOS:
        validationResult = Guard.againstNullOrUndefinedInBulk([
          { label: "idCandidato", value: props.idCandidato },
          { label: "nombresCandidato", value: props.nombresCandidato },
          { label: "fechaNacimientoCandidato", value: props.fechaNacimientoCandidato },
          { label: "idPartido", value: props.idPartido },
          { label: "idCargo", value: props.idCargo },
        ]);
        break;
      case INDICES_PARA_TEMPORALES.CARGOS:
        validationResult = Guard.againstNullOrUndefinedInBulk([
          { label: "idCargo", value: props.idCargo },
          { label: "cargo", value: props.cargo },
        ]);
        break;
      case INDICES_PARA_TEMPORALES.CIUDADANOS:
        validationResult = Guard.againstNullOrUndefinedInBulk([
          { label: "dpi", value: props.dpi },
          { label: "nombreCiudadano", value: props.nombreCiudadano },
          { label: "apellidoCiudadano", value: props.apellidoCiudadano },
          { label: "direccionCiudadano", value: props.direccionCiudadano },
          { label: "telefonoCiudadano", value: props.telefonoCiudadano },
          { label: "edadCiudadano", value: props.edadCiudadano },
          { label: "generoCiudadano", value: props.generoCiudadano },
        ]);
        break;
      case INDICES_PARA_TEMPORALES.DEPARTAMENTOS:
        validationResult = Guard.againstNullOrUndefinedInBulk([
          { label: "idDepartamento", value: props.idDepartamento },
          { label: "departamento", value: props.departamento },
        ]);
        break;
      case INDICES_PARA_TEMPORALES.MESAS:
        validationResult = Guard.againstNullOrUndefinedInBulk([
          { label: "idMesa", value: props.idMesa },
          { label: "idDepartamento", value: props.idDepartamento },
        ]);
        break;
      case INDICES_PARA_TEMPORALES.PARTIDOS:
        validationResult = Guard.againstEmptyArray([
          { label: "idPartido", value: props.idPartido },
          { label: "nombrePartido", value: props.nombrePartido },
          { label: "siglasPartido", value: props.siglasPartido },
          { label: "fundacionPartido", value: props.fundacionPartido },
        ]);
        break;
      case INDICES_PARA_TEMPORALES.VOTACIONES:
        validationResult = Guard.againstEmptyArray([
          { label: "idVoto", value: props.idVoto },
          { label: "idCandidato", value: props.idCandidato },
          { label: "dpi", value: props.dpi },
          { label: "idMesa", value: props.idMesa },
          { label: "fechaHoraVoto", value: props.fechaHoraVoto },
        ]);
        break;
      default:
        return Result.fail(`No puede existir un registro temporal de tipo ${props.tipo}`);
    }
    if (validationResult.isFailure) {
      return Result.fail(validationResult.getErrorValue());
    }
    return Result.ok(new Temporal(props, id));
  }

  toRaw(): string {
    let raw = "";
    switch(this.props.tipo) {
      case INDICES_PARA_TEMPORALES.CANDIDATOS:
        raw = `(${this.props.tipo}, NULL, NULL, NULL, ${this.props.idCargo.toValue()}, NULL, ${this.props.idPartido.toValue()}, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ${this.props.idCandidato.toValue()}, '${this.props.nombresCandidato.replace('\'', '')}', '${moment(this.props.fechaNacimientoCandidato.toISOString()).format('YYYY-MM-DD HH:mm:ss')}', NULL, NULL)`;
        break;
      case INDICES_PARA_TEMPORALES.CARGOS:
        raw = `(${this.props.tipo}, NULL, NULL, NULL, ${this.props.idCargo.toValue()}, '${this.props.cargo}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`;
        break;
      case INDICES_PARA_TEMPORALES.CIUDADANOS:
        raw = `(${this.props.tipo}, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ${this.props.dpi.toValue()}, '${this.props.nombreCiudadano.replace("\'", "")}', '${this.props.apellidoCiudadano.replace("\'", "")}', '${this.props.direccionCiudadano.replace("\'", "")}', '${this.props.telefonoCiudadano}', ${this.props.edadCiudadano}, '${this.props.generoCiudadano}', NULL, NULL, NULL, NULL, NULL)`;
          break;
      case INDICES_PARA_TEMPORALES.DEPARTAMENTOS:
        raw = `(${this.props.tipo}, ${this.props.idDepartamento.toValue()}, '${this.props.departamento}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`;
        break;
      case INDICES_PARA_TEMPORALES.MESAS:
        raw = `(${this.props.tipo}, ${this.props.idDepartamento.toValue()}, NULL, ${this.props.idMesa.toValue()}, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`;
        break;
      case INDICES_PARA_TEMPORALES.PARTIDOS:
        raw = `(${this.props.tipo}, NULL, NULL, NULL, NULL, NULL, ${this.props.idPartido.toValue()}, '${this.props.nombrePartido}', '${this.props.siglasPartido}', '${moment(this.props.fundacionPartido.toISOString()).format("YYYY-MM-DD HH:mm:ss")}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`;
        break;
      case INDICES_PARA_TEMPORALES.VOTACIONES:
        raw = `(${this.props.tipo}, NULL, NULL, ${this.props.idMesa.toValue()}, NULL, NULL, NULL, NULL, NULL, NULL, ${this.props.dpi.toValue()}, NULL, NULL, NULL, NULL, NULL, NULL, ${this.props.idCandidato.toValue()}, NULL, NULL, ${this.props.idVoto.toValue()}, '${moment.utc(this.props.fechaHoraVoto.toISOString()).format("YYYY-MM-DD HH:mm:ss")}')`;
        break;
    }
    return raw;
  }
}