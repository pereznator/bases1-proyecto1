import moment from "moment";
import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface IPartidoProps {
  nombre: string;
  siglas: string;
  fundacion: Date;
}

export class Partido extends Entity<IPartidoProps> {
  private constructor(props: IPartidoProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IPartidoProps, id: UniqueEntityID): Result<Partido> {
    const validation = Guard.againstNullOrUndefinedInBulk([
      { label: "nombre", value: props.nombre },
      { label: "siglas", value: props.siglas },
      { label: "fundacion", value: props.fundacion },
    ]);
    if (validation.isFailure) {
      return Result.fail(validation.getErrorValue());
    }
    return Result.ok(new Partido(props, id));
  }

  public static toDomain(raw: any): Partido {
    const props: IPartidoProps = {
      nombre: raw.nombre,
      siglas: raw.siglas,
      fundacion: new Date(raw.fundacion)
    };
    const partidoResult = this.create(props, new UniqueEntityID(raw.id));
    return partidoResult.isSuccess ? partidoResult.getValue() : null;
  }

  public static toRaw(partido: Partido): string {
    return `(${partido.id.toValue()}, '${partido.props.nombre}', '${partido.props.siglas}', '${moment(partido.props.fundacion.toISOString()).format("YYYY-MM-DD HH:mm:ss")}')`;
  }
}