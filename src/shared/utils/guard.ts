import { Result } from "./../core/result";
/**
 * Guard methods for
 */
export class Guard {
  /**
   * Cannot create instances of this class
   */
  private constructor() {}

  /**
   * Checks wether a value is null or undefined
   * @param {any} value
   * @return {Result}
   */
  public static againstNullOrUndefined(value: any): Result<any> {
    if (value === null || value === undefined) {
      return Result.fail(`Undefined or null value.`);
    }
    return Result.ok(value);
  }

  /**
   * Validates a group of values
   * @param {PossibleValue[]} values
   * @return {Result}
   */
  public static againstNullOrUndefinedInBulk(
    values: PossibleValue[]
  ): Result<PossibleValue[]> {
    for (const value of values) {
      if (Guard.againstNullOrUndefined(value.value).isFailure) {
        return Result.fail(
          `Invalid value ${value.label} is null or undefined.`
        );
      }
    }
    return Result.ok(values);
  }

  /**
   * Validates if an array is not empty.
   * @param {any[]} value
   * @return {Result<any>}
   */
  public static againstEmptyArray(value: any[]): Result<any> {
    if (value.length === 0) {
      return Result.fail("Array is empty.");
    }
    return Result.ok(value);
  }

  /**
   * Guard against zero
   * @param {number} value
   * @return {Result<number>}
   */
  public static againstZero(value: number): Result<number> {
    if (this.againstNullOrUndefined(value).isFailure) {
      return Result.fail("Value is null or undefined.");
    }
    if (value === 0) {
      return Result.fail("Value is 0");
    } else {
      return Result.ok(value);
    }
  }

  /**
   * Guards a value against not being a number
   * @param {any} value
   * @return {Result}
   */
  public static againstNaN(value: any): Result<number> {
    if (isNaN(value)) {
      return Result.fail(`The value is not a number`);
    }
    return Result.ok(value);
  }
}

export interface PossibleValue {
  label: string;
  value: any;
}
