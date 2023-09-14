import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from '../../shared/domain/uniqueEntityId';
import { Guard } from "../../shared/utils/guard";

export interface IMesaProps {
  departamentoId: UniqueEntityID;
}

export class Mesa extends Entity<IMesaProps> {
  private constructor(props: IMesaProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IMesaProps, id: UniqueEntityID): Result<Mesa> {
    if (Guard.againstNullOrUndefined(props.departamentoId).isFailure) {
      return Result.fail("'departamentoId' is required");
    }
    return Result.ok(new Mesa(props, id));
  }

  public static toDomain(raw: any): Mesa {
    const props: IMesaProps = {
      departamentoId: new UniqueEntityID(raw.id_departamento)
    };
    const mesaResult = this.create(props, new UniqueEntityID(raw.id));
    return mesaResult.isSuccess ? mesaResult.getValue() : null;
  }

  public static toRaw(mesa: Mesa): string {
    return `(${mesa.id.toValue()}, ${mesa.props.departamentoId.toValue()})`;
  }
}