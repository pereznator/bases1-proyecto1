import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface ICandidatoProps {
  nombre: string;
  fechaNacimiento: string;
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

}
