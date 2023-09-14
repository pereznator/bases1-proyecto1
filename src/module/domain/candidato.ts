import moment from "moment";
import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface ICandidatoProps {
  nombre: string;
  fechaNacimiento: Date;
  partidoId: UniqueEntityID;
  cargoId: UniqueEntityID;
}

export class Candidato extends Entity<ICandidatoProps> {
  
  protected constructor(props: ICandidatoProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ICandidatoProps, id: UniqueEntityID): Result<Candidato> {
    const candidatoValidation = Guard.againstNullOrUndefinedInBulk([
      { value: props.nombre, label: "nombre" },
      { value: props.fechaNacimiento, label: "fechaNacimiento" },
      { value: props.partidoId, label: "partidoId" },
      { value: props.cargoId, label: "cargoId" },
    ]);
    if (candidatoValidation.isFailure) {
      return Result.fail(candidatoValidation.getErrorValue());
    }
    return Result.ok(new Candidato(props, id));
  }

  public static toDomain(raw: any): Candidato {
    const props: ICandidatoProps = {
      nombre: raw.nombre,
      fechaNacimiento: new Date(raw.fecha_nacimiento),
      partidoId: new UniqueEntityID(raw.id_partido),
      cargoId: new UniqueEntityID(raw.id_cargo),
    };
    const result = Candidato.create(props, new UniqueEntityID(raw.id));
    return result.isSuccess ? result.getValue() : null;
  }

  public static toRaw(candidato: Candidato): string {
    return `(${candidato.id.toValue()}, '${candidato.props.nombre}', '${moment(candidato.props.fechaNacimiento.toISOString()).format("YYYY-MM-DD HH:mm:ss")}', ${candidato.props.partidoId.toValue()}, ${candidato.props.cargoId.toValue()})`;
  }

}
