import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class Top10EdadesDeVotantesController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const top10 = await sqlEleccionesRepo.listarTop10Edades();
      return this.ok(res, top10);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
