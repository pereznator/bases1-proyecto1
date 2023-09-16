import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";
import { configRepo } from "../repos/configRepo";
import moment from "moment";

export class CargarDatosATablaTemporalController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      await configRepo.crearModelo();
      await configRepo.cargarATablaTemporal();
      return this.ok(res, "Datos cargados a tabla temporal exitosamente.");
    } catch (err) {
      console.error(err);
      return this.bad(res, err);
    }
  }
}
