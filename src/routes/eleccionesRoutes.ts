import { Request, Response, Router } from "express";
import { ListarPresidentesYVicepresidentesController } from '../module/useCases/listarPresidentesYVicepresidentesControlle';
import { ListarNumeroDeCandidatosController } from '../module/useCases/listarNumeroDeCandidatosController';
import { ListarNombresDeCandidatosController } from '../module/useCases/listarNombresDeCandidatos';
import { ListarCantidadDeCandidatosPorPartidoController } from '../module/useCases/listarCantidadDeCandidatosPorPartidoController';
import { ListarCantidadDeVotosPorDepartamentoController } from '../module/useCases/listarCantidadDeVotacionesPorDepartamentosController';
import { ListarCantidadDeVotosNulosController } from '../module/useCases/listarCantidadDeVotosNulosController';
import { Top10EdadesDeVotantesController } from '../module/useCases/top10EdadesDeVotantesController';
import { Top10CandidatosMasVotadosController } from '../module/useCases/top10CandidatosMasVotadosController';
import { Top5MesasMasFrecuentadasController } from '../module/useCases/top5MesasMasFrecuentadasController';
import { Top5HoraMasConcurridaDeVotosController } from '../module/useCases/top5HoraMasConcurridaDeVotosController';
import { ListarCantidadDeVotosPorGeneroController } from '../module/useCases/listarCantidadDeVotosPorGeneroController';
import { EliminarTablaTemporalController } from '../module/config/eliminarTablaTemporalController';
import { CargarDatosATablaTemporalController } from '../module/config/cargarDatosATablaTemporalController';
import { EliminarTablasController } from '../module/config/eliminarTablasController';
import { CrearTablasController } from '../module/config/crearTablasController';
import { CargarATablasController } from '../module/config/cargarATablasController';

const listarPresidentesYVicepresidentesController = new ListarPresidentesYVicepresidentesController();
const listarNumeroDeCandidatosController = new ListarNumeroDeCandidatosController();
const listarNombresDeCandidatosController = new ListarNombresDeCandidatosController();
const listarCantidadDeCandidatosPorPartidoController = new ListarCantidadDeCandidatosPorPartidoController();
const listarCantidadDeVotosPorDepartamentoController = new ListarCantidadDeVotosPorDepartamentoController();
const listarCantidadDeVotosNulosController = new ListarCantidadDeVotosNulosController();
const top10EdadesDeVotantesController = new Top10EdadesDeVotantesController();
const top10CandidatosMasVotadosController = new Top10CandidatosMasVotadosController();
const top5MesasMasFrecuentadasController = new Top5MesasMasFrecuentadasController();
const top5HoraMasConcurridaDeVotosController = new Top5HoraMasConcurridaDeVotosController();
const listarCantidadDeVotosPorGeneroController = new ListarCantidadDeVotosPorGeneroController();
const eliminarTablaTemporalController = new EliminarTablaTemporalController();
const cargarDatosATablaTemporalController = new CargarDatosATablaTemporalController();
const eliminarTablasController = new EliminarTablasController();
const crearTablasController = new CrearTablasController();
const cargarATablasController = new CargarATablasController();

export const eleccionesRouter = Router();

eleccionesRouter.get("/consulta1", (req: Request, res: Response) => {
  return listarPresidentesYVicepresidentesController.excecute(req, res);
});

eleccionesRouter.get("/consulta2", (req: Request, res: Response) => {
  return listarCantidadDeCandidatosPorPartidoController.excecute(req, res);
});

eleccionesRouter.get("/consulta3", (req: Request, res: Response) => {
  return listarNombresDeCandidatosController.excecute(req, res);
});

eleccionesRouter.get("/consulta4", (req: Request, res: Response) => {
  return listarNumeroDeCandidatosController.excecute(req, res);
});

eleccionesRouter.get("/consulta5", (req: Request, res: Response) => {
  return listarCantidadDeVotosPorDepartamentoController.excecute(req, res);
});

eleccionesRouter.get("/consulta6", (req: Request, res: Response) => {
  return listarCantidadDeVotosNulosController.excecute(req, res);
});

eleccionesRouter.get("/consulta7", (req: Request, res: Response) => {
  return top10EdadesDeVotantesController.excecute(req, res);
});

eleccionesRouter.get("/consulta8", (req: Request, res: Response) => {
  return top10CandidatosMasVotadosController.excecute(req, res);
});

eleccionesRouter.get("/consulta9", (req: Request, res: Response) => {
  return top5MesasMasFrecuentadasController.excecute(req, res);
});

eleccionesRouter.get("/consulta10", (req: Request, res: Response) => {
  return top5HoraMasConcurridaDeVotosController.excecute(req, res);
});

eleccionesRouter.get("/consulta11", (req: Request, res: Response) => {
  return listarCantidadDeVotosPorGeneroController.excecute(req, res);
});

eleccionesRouter.get("/eliminartabtemp", (req: Request, res: Response) => {
  return eliminarTablaTemporalController.excecute(req, res);
});

eleccionesRouter.get("/cargartabtemp", (req: Request, res: Response) => {
  return cargarDatosATablaTemporalController.excecute(req, res);
});

eleccionesRouter.get("/eliminarmodelo", (req: Request, res: Response) => {
  return eliminarTablasController.excecute(req, res);
});

eleccionesRouter.get("/crearmodelo", (req: Request, res: Response) => {
  return crearTablasController.excecute(req, res);
});

eleccionesRouter.get("/cargarmodelo", (req: Request, res: Response) => {
  return cargarATablasController.excecute(req, res);
});
