import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { sqlEleccionesRepo } from "../repos/sqlEleccionesRepo";

export class ListarCantidadDeVotosNulosController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      const votosNulos = await sqlEleccionesRepo.listarVotosNulos();
      return this.ok(res, votosNulos);
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
