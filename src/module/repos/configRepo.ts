import { database } from "../../db/database";
import { sqlEliminarTabla } from "../../db/scripts/eliminarTablas";
import { sqlCrearModelo } from "../../db/scripts/crearModelo";
import { TABLAS } from "../../shared/utils/constants";

class ConfigRepo {
  async crearModelo(): Promise<any> {
    //const filePath = path.join(__dirname, "..", "..", "..", "src", "db", "scripts", "db.ddl");
    //"../../db/scripts/db.ddl";
    const sqlCommands = sqlCrearModelo.replace("\n", "").split(";");
    for (let command of sqlCommands) {
      if (command.trim() !== "") {
        await database.connection.query(command);
        //console.log("[Consulta]", command, consulta);
      }
    }
  }

  async eliminarModelo(): Promise<any> {
    const tablas = Object.values(TABLAS);
    for (const tabla of tablas) {
      const sqlCommands = sqlEliminarTabla(tabla).split(";");
      console.log(sqlCommands);
      for (const command of sqlCommands) {
        if (command !== '\n') {
          await database.connection.query(command);
        }
      }
    }
    //return result;
  }
}

export const configRepo = new ConfigRepo();
