import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "elecciones"
});
