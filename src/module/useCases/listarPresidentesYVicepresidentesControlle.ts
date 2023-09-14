import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class ListarPresidentesYVicepresidentesController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const lista = await sqlEleccionesRepo.listartPresidentesYVicepresidentesPorPartido();
      return this.ok(res, lista);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
