import moment from "moment";
import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface IVotoProps {
  candidatoId: UniqueEntityID;
  dpi: UniqueEntityID;
  mesaId: UniqueEntityID;
  fechaHora: Date;
}

export class Voto extends Entity<IVotoProps> {
  protected constructor(props: IVotoProps, id: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: IVotoProps, id: UniqueEntityID): Result<Voto> {
    const validation = Guard.againstNullOrUndefinedInBulk([
      { label: "candidatoId", value: props.candidatoId },
      { label: "dpi", value: props.dpi },
      { label: "mesaId", value: props.mesaId },
      { label: "fechaHora", value: props.fechaHora },
    ]);
    if (validation.isFailure) {
      return Result.fail(validation.getErrorValue());
    }
    return Result.ok(new Voto(props, id));
  }

  public static toDomain(raw: any): Voto {
    const props: IVotoProps = {
      candidatoId: new UniqueEntityID(raw.id_candidato),
      dpi: new UniqueEntityID(raw.dpi),
      mesaId: new UniqueEntityID(raw.id_mesa),
      fechaHora: new Date(raw.fecha_hora),
    };
    const result = this.create(props, new UniqueEntityID(raw.id));
    return result.isSuccess ? result.getValue() : null;
  }

  public static toRaw(voto: Voto): string {
    return `(${voto.id.toValue()}, ${voto.props.candidatoId.toValue()}, '${voto.props.dpi.toString()}', ${voto.props.mesaId.toValue()}, '${moment(voto.props.fechaHora.toISOString()).format("YYYY-MM-DD HH:mm:ss")}')`;
  }
}
