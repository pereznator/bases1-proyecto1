import { Request, Response } from "express";
import { BaseController } from "../../shared/http/baseController";

export class ListarPresidentesYVicepresidentesController extends BaseController {

  protected async handle(req: Request, res: Response): Promise<any> {
    try {
      
    } catch (err) {
      return this.bad(res, err);
    }
  }
}
