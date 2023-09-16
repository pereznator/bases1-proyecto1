import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import moment from "moment";
import { FORMATO_FECHA_HORA } from "../../shared/utils/constants";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class Top5HoraMasConcurridaDeVotosController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const top5Horas = await sqlEleccionesRepo.listarTop5Horas()
      return this.ok(res, top5Horas);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
