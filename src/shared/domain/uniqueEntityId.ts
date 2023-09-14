import { Identifier } from "./identifier";
import { v4 as uuid } from "uuid";

/**
 * Defines an unique identifier
 */
export class UniqueEntityID extends Identifier<string | number> {
  /**
   * Create an unique identifier
   * @param {string | number} id
   */
  constructor(id?: string | number) {
    super(id ?? uuid());
  }
}
