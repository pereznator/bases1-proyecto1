import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { database } from "../../db/database";
import { configRepo } from "../repos/configRepo";

export class CrearTablasController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      //await database.startTransaction();
      await configRepo.crearModelo();
      //await database.commitTransaction();
      return this.ok(res, "Modelo creado exitosamente.");
    } catch (err) {
      console.error(err);
      //await database.rollbackTransaction();
      return this.bad(res, err);
    }
  }
}
