import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class Top5MesasMasFrecuentadasController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const top5Mesas = await sqlEleccionesRepo.listarTop5Mesas();
      return this.ok(res, top5Mesas);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
