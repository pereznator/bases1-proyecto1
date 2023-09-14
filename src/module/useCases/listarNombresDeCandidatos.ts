import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class ListarNombresDeCandidatosController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const alcaldes = await sqlEleccionesRepo.listarAlcaldesPorPartido();
      return this.ok(res, alcaldes);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
