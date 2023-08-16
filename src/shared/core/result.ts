/**
 * Result class
 */
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error?: string;
  private value?: T;

  /**
   * Creates a class
   * @param {boolean} isSuccess
   * @param {string} error
   * @param {T} value
   */
  public constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "InvalidOperationError: A result cannot be successfully and have an error."
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        "InvalidOperationError: A failing result needs to contain an error message."
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  /**
   * Gets the value of the result
   * @return {T}
   */
  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("Can't get the value of an error result.");
    }
    return this.value as T;
  }

  /**
   * Gets the error message
   * @return {string}
   */
  public getErrorValue(): string {
    if (this.isSuccess) {
      throw new Error("Can't get the error value of a successfull result.");
    }
    return this.error ? this.error : "No error message defined.";
  }

  /**
   *
   * @param {U} value
   * @return {Result}
   */
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  /**
   *
   * @param {string} error
   * @return {Result}
   */
  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
