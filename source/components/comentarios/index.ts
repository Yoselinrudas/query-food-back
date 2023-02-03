import { Router } from "express";
import { verifyToken } from "../middleware";
import { CrearComentario, BuscarComentario,EliminarComentario,ActualizaComentario , AllComentario} from "./controller";


const comentarioRouter: Router = Router();

comentarioRouter.post("/",verifyToken, CrearComentario);
comentarioRouter.get("/:id", BuscarComentario);
comentarioRouter.delete("/:id",EliminarComentario);
comentarioRouter.put("/:id",ActualizaComentario);
comentarioRouter.get("/",AllComentario);

export default comentarioRouter;