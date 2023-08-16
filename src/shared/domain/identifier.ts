/**
 * Identifier class
 */
export class Identifier<T> {
  /**
   * Constructor for the identifier
   */
  constructor(private value: T) {
    this.value = value;
  }

  /**
   * Checks if two identifiers are the same
   * @param {Identifier} id
   * @return {boolean}
   */
  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  /**
   * Converts the value to a string
   * @return {string}
   */
  toString(): string {
    return String(this.value);
  }

  /**
   * Return raw value of identifier
   * @return {T}
   */
  toValue(): T {
    return this.value;
  }
}
