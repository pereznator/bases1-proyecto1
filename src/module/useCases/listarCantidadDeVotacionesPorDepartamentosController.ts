import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class ListarCantidadDeVotosPorDepartamentoController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const votosPorDepartamento = await sqlEleccionesRepo.listarVotosPorDepartamento();
      return this.ok(res, votosPorDepartamento);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
