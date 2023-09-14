import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface IDepartamentoProps {
  departamento: string;
}

export class Departamento extends Entity<IDepartamentoProps> {
  private constructor(props: IDepartamentoProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IDepartamentoProps, id: UniqueEntityID): Result<Departamento> {
    if (Guard.againstNullOrUndefined(props.departamento).isFailure) {
      return Result.fail("'departamento' es requerido para crear Departamento.");
    }
    return Result.ok(new Departamento(props, id));
  }

  public static toDomain(raw: any): Departamento {
    const props: IDepartamentoProps = {
      departamento: raw.departamento
    };
    const departamentoResult = this.create(props, new UniqueEntityID(raw.id));
    if (departamentoResult.isFailure) {
      return null;
    }
    return departamentoResult.getValue();
  }

  public static toRaw(departamento: Departamento): any {
    return `(${departamento.id.toValue()}, '${departamento.props.departamento}')`
  }
}