import { Router } from "express";
import { ActualiRestaurante, AllRestaurante, BuscarRestaurante, CrearRestaurante, EliminarRestaurante } from "./controller";

import { verifyToken } from "../middleware";

const restauranteRouter: Router = Router();

restauranteRouter.post("/",verifyToken, CrearRestaurante);
restauranteRouter.get("/:id", verifyToken, BuscarRestaurante);
restauranteRouter.delete("/:id",EliminarRestaurante);
restauranteRouter.put("/:id",ActualiRestaurante);
restauranteRouter.get("/",AllRestaurante);

export default restauranteRouter;