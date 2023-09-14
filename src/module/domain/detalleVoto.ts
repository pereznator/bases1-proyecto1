import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface IDetalleVotoProps {
  votoId: UniqueEntityID;
  candidatoId: UniqueEntityID;
}

export class DetalleVoto extends Entity<IDetalleVotoProps> {
  protected constructor(props: IDetalleVotoProps, id: UniqueEntityID) {
    super(props, id);
  }
  
  public static create(props: IDetalleVotoProps, id: UniqueEntityID): Result<DetalleVoto> {
    const validation = Guard.againstNullOrUndefinedInBulk([
      { value: props.votoId, label: "votoId" },
      { value: props.candidatoId, label: "candidatoId" },
    ]);
    if (validation.isFailure) {
      return Result.fail(validation.getErrorValue());
    }
    return Result.ok(new DetalleVoto(props, id));
  }

  public static toDomain(raw: any): DetalleVoto {
    const props: IDetalleVotoProps = {
      votoId: new UniqueEntityID(raw.id_voto),
      candidatoId: new UniqueEntityID(raw.id_candidato)
    };
    const result = this.create(props, new UniqueEntityID(raw.id));
    return result.isSuccess ? result.getValue() : null;
  }

  public static toRaw(detalleVoto: DetalleVoto): string {
    return `(${detalleVoto.props.votoId.toValue()}, ${detalleVoto.props.candidatoId.toValue()})`;
  }
}