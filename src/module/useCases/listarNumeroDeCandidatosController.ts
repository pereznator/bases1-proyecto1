import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class ListarNumeroDeCandidatosController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const numeroDeCanidatosPorPartido = await sqlEleccionesRepo.listarNumeroDeCandidatosPorPartido();
      return this.ok(res, numeroDeCanidatosPorPartido);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
