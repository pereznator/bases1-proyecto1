import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class Top10CandidatosMasVotadosController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const top10PresidentesMasVotados = await sqlEleccionesRepo.listarTop10PresidentesMasVotados();
      return this.ok(res, top10PresidentesMasVotados);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
