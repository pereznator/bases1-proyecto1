import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class ListarCantidadDeVotosPorGeneroController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const votosPorGenero = await sqlEleccionesRepo.listarVotosPorGenero();
      return this.ok(res, votosPorGenero);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
