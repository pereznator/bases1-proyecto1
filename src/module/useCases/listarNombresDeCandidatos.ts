import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";

export class ListarNombresDeCandidatosController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      console.log("Hola mundo");
      return this.ok(res, "Ok request.");
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
