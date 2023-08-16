import { type UniqueEntityID } from "./uniqueEntityId";

/**
 * Class representing an Entity
 */
export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  /**
   * Constructs a new Entity
   * @param {T} props
   * @param {UniqueEntityID} id
   */
  constructor(props: T, id: UniqueEntityID) {
    this.props = props;
    this._id = id;
  }

  /**
   * Gets the id of the Entity
   */
  get id(): UniqueEntityID {
    return this._id;
  }
}
