import {
  createPool,
  PoolOptions,
  Pool,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';

export class MySQL {
  private conn: Pool;
  private credentials: PoolOptions;

  constructor(credentials: PoolOptions) {
    this.credentials = credentials;
    this.conn = createPool(this.credentials);
  }

  private ensureConnection() {
    if (!this?.conn) this.conn = createPool(this.credentials);
  }

  /** For `SELECT` and `SHOW` */
  queryRows = async (
    sql: string,
    values?: any
  ): Promise<RowDataPacket[]> => {
    this.ensureConnection();
    const [rows] = await this.conn.query<RowDataPacket[]>(sql, values);
    return rows;
  };

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  queryRowsAsArray = async (
    sql: string,
    values?: any
  ): Promise<RowDataPacket[][]> => {
    this.ensureConnection();
    const [rows] = await this.conn.query<RowDataPacket[][]>(sql, values);
    return rows;
  };

  /** For `INSERT`, `UPDATE`, etc. */
  queryResult = async (
    sql: string,
    values?: any
  ): Promise<ResultSetHeader> => {
    this.ensureConnection();
    const [result] = await this.conn.query<ResultSetHeader>(sql, values);
    return result;
  };

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  queryResults = async (
    sql: string,
    values?: any
  ): Promise<ResultSetHeader[]> => {
    this.ensureConnection();
    const [results] = await this.conn.query<ResultSetHeader[]>(sql, values);
    return results;
  };

  /** For `SELECT` and `SHOW` */
  executeRows = async (
    sql: string,
    values?: any
  ): Promise<RowDataPacket[]> => {
    this.ensureConnection();
    const [rows] = await this.conn.execute<RowDataPacket[]>(sql, values);
    return rows;
  };

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  executeRowsAsArray = async (
    sql: string,
    values?: any
  ): Promise<RowDataPacket[][]> => {
    this.ensureConnection();
    const [rows] = await this.conn.execute<RowDataPacket[][]>(sql, values);
    return rows;
  };

  /** For `INSERT`, `UPDATE`, etc. */
  executeResult = async (
    sql: string,
    values?: any
  ): Promise<ResultSetHeader> => {
    this.ensureConnection();
    const [result] = await this.conn.execute<ResultSetHeader>(sql, values);
    return result;
  };

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  executeResults = async (
    sql: string,
    values?: any
  ): Promise<ResultSetHeader[]> => {
    this.ensureConnection();
    const [results] = await this.conn.execute<ResultSetHeader[]>(sql, values);
    return results;
  };

  startTransaction = async (): Promise<void> => {
    this.ensureConnection();
    await this.conn.execute('START TRANSACTION;');
  }

  commitTransaction = async (): Promise<void> => {
    this.ensureConnection();
    await this.conn.execute('COMMIT;');
  }

  rollbackTransaction = async (): Promise<void> => {
    this.ensureConnection();
    await this.conn.execute('ROLLBACK;');
  }

  /** Expose the Pool Connection */
  get connection() {
    return this.conn;
  }
}
