import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class ListarCantidadDeCandidatosPorPartidoController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const numeroDeDiputadosPorPartido = await sqlEleccionesRepo.listarNumeroDeDiputadosPorPartido();
      return this.ok(res, numeroDeDiputadosPorPartido);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
