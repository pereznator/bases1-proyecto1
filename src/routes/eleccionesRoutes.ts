import { Request, Response, Router } from "express";
import { ListarPresidentesYVicepresidentesController } from '../module/useCases/listarPresidentesYVicepresidentesControlle';

const listarPresidentesYVicepresidentesController = new ListarPresidentesYVicepresidentesController();

export const eleccionesRouter = Router();

eleccionesRouter.get("/consulta1", (req: Request, res: Response) => {
  return listarPresidentesYVicepresidentesController.excecute(req, res);
});

eleccionesRouter.get("/consulta2", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta3", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta4", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta5", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta6", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta7", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta8", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta9", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta10", (req: Request, res: Response) => {

});

eleccionesRouter.get("/consulta11", (req: Request, res: Response) => {

});

eleccionesRouter.get("/eliminartabtemp", (req: Request, res: Response) => {

});

eleccionesRouter.get("/cargartabtemp", (req: Request, res: Response) => {

});

eleccionesRouter.get("/eliminarmodelo", (req: Request, res: Response) => {

});

eleccionesRouter.get("/crearmodelo", (req: Request, res: Response) => {

});

eleccionesRouter.get("/cargarmodelo", (req: Request, res: Response) => {

});
