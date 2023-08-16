import { Identifier } from "./identifier";
/**
 * Defines an unique identifier
 */
export class UniqueEntityID extends Identifier<string | number> {
  /**
   * Create an unique identifier
   * @param {string | number} id
   */
  constructor(id?: string | number) {
    super(id ?? null);
  }
}
