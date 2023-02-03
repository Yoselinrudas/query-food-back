import { Router } from "express";
import { verifyToken } from "../middleware";
import { CrearUsuario, Logeo ,BuscarUsuario,EliminarUsuario, ActualiUsuario, AllUsuario} from "./controller";

const usuarioRouter: Router = Router();

usuarioRouter.post("/", CrearUsuario);
usuarioRouter.post("/login", Logeo);
usuarioRouter.get("/:id", verifyToken, BuscarUsuario);
usuarioRouter.delete("/:id",EliminarUsuario);
usuarioRouter.put("/:id",ActualiUsuario);
usuarioRouter.get("/",AllUsuario);

export default usuarioRouter;