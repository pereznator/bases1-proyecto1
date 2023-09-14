import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface ICargoProps {
  cargo: string
}

export class Cargo extends Entity<ICargoProps> {
  
  private constructor (props: ICargoProps, id: UniqueEntityID) {
    super(props, id);
  }
  
  public static create(props: ICargoProps, id: UniqueEntityID): Result<Cargo> {
    if (Guard.againstNullOrUndefined(props.cargo).isFailure) {
      return Result.fail("'cargo' is required to create a Cargo object.");
    }
    return Result.ok(new Cargo(props, id));
  }

  public static toDomain(raw: any): Cargo {
    const validation = Guard.againstNullOrUndefinedInBulk([
      { label: "id", value: raw.id },
      { label: "cargo", value: raw.cargo },
    ]);
    if (validation.isFailure) {
      return null;
    }
    return Cargo.create({ cargo: raw.cargo }, new UniqueEntityID(raw.id)).getValue();
  }


  public static toRaw(cargo: Cargo): string {
    return `(${cargo.id.toValue()}, '${cargo.props.cargo}')`;
  }

}