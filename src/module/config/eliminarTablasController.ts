import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { configRepo } from "../repos/configRepo";

export class EliminarTablasController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      await configRepo.eliminarModelo();
      return this.ok(res, "Tablas eliminadas exitosamente.");
    } catch (err) {
      console.error(err);
      return this.bad(res, err);
    }
  }
}
