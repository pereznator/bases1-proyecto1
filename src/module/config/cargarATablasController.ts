import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { configRepo } from "../repos/configRepo";

export class CargarATablasController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      await configRepo.cargarTablas();
      return this.ok(res, "Se cargaron las tablas del modelo exitosamente.");
    } catch (err) {
      console.log(err);
      return this.bad(res, err);
    }
  }
}
