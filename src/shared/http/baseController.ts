import { Request, Response } from "express";
import { status } from "./status";

export abstract class BaseController {
  
  protected abstract handle(req: Request, res: Response): Promise<void| any>;
  
  public async excecute<T>(req: Request, res: Response): Promise<void | any> {
    try {
      await this.handle(req, res);
    } catch (error) {
      console.error(error);
      this.bad(res, error);
    }
  }

  public ok<T>(res: Response, data: T): void | any {
    if (data) {
      res.type("application/json");
      return res.status(status.success).json({
        status: status.success,
        data,
      });
    } else {
      return res.status(status.success).json({ status: status.success });
    }
  }

  public bad<T>(res: Response, message?: T): void | any {
    return res.status(status.bad).json({
      status: status.bad,
      error: message ?? "Bad Request.",
    });
  }
}
