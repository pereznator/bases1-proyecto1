import { MySQL } from "./dbConfig";

export const database = new MySQL({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "elecciones"
});
