import { Result } from "../../shared/core/result";
import { Entity } from "../../shared/domain/entity";
import { UniqueEntityID } from "../../shared/domain/uniqueEntityId";
import { Guard } from "../../shared/utils/guard";

export interface ICiudadanoProps {
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  edad: number;
  genero: string;
}

export class Ciudadano extends Entity<ICiudadanoProps> {
  private constructor(props: ICiudadanoProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ICiudadanoProps, id: UniqueEntityID): Result<Ciudadano> {
    const validation = Guard.againstNullOrUndefinedInBulk([
      { label: "nombre", value: props.nombre },
      { label: "apellido", value: props.apellido },
      { label: "direccion", value: props.direccion },
      { label: "telefono", value: props.telefono },
      { label: "edad", value: props.edad },
      { label: "genero", value: props.genero },
    ]);
    if (validation.isFailure) {
      return Result.fail(validation.getErrorValue());
    }
    if (props.genero.length > 1) {
      return Result.fail("'genero' debe ser de un caracter.");
    }
    props.genero = props.genero.toUpperCase();
    if (props.genero !== 'M' && props.genero !== 'F') {
      return Result.fail(`'genero' debe ser 'M' o 'F'. No puede ser '${props.genero}'.`);
    }
    return Result.ok(new Ciudadano(props, id));
  }

  public static toDomain(raw: any): Ciudadano {
    const props: ICiudadanoProps = {
      nombre: raw.nombre,
      apellido: raw.apellido,
      direccion: raw.direccion,
      telefono: raw.telefono,
      edad: raw.edad,
      genero: raw.genero,
    };
    const ciudadanoResult = this.create(props, new UniqueEntityID(raw.dpi));
    return ciudadanoResult.isSuccess ? ciudadanoResult.getValue() : null;
  }

  public static toRaw(ciudadano: Ciudadano): string {
    return `('${ciudadano.id.toValue()}', '${ciudadano.props.nombre}', '${ciudadano.props.apellido}', '${ciudadano.props.direccion}', '${ciudadano.props.telefono}', ${ciudadano.props.edad}, '${ciudadano.props.genero}')`;
  }
}