import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connection } from "./db/database";

export class Server {
  
  private readonly app: express.Application;
  private readonly port: any;
  
  constructor(port: any) {
     // Create express serrver
     this.port = port;
     this.app = express();
     this.configure();
  }

  private configure(): void {
    // Parse JSON
    const jsonParser = bodyParser.json();
    this.app.use(jsonParser);
    this.app.use(express.urlencoded({ extended: false }));
    // CORS
    this.app.use(cors());
  }

  private async connectToDatabase(): Promise<void> {
    connection.connect((err) => {
      if (err) {
        console.error("No se pudo conectar a la base de datos. ", err);
      }
      console.info("Conexión a base de datos establecida exitosamente.");
    });
  }

  public async listen(): Promise<void> {
    await this.connectToDatabase();
    this.app.listen(this.port, () => {
      console.info("Esscuchando en puerto: " + this.port);
    });
  }

}
