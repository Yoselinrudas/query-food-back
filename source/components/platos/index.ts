import { Router } from "express";
import { verifyToken } from "../middleware";
import { CrearPlato, BuscarPlato,EliminarPlato, ActualizaPlato, AllPlato} from "./controller";


const platoRouter: Router = Router();

platoRouter.post("/",verifyToken, CrearPlato);
platoRouter.get("/:id", BuscarPlato);
platoRouter.delete("/:id",EliminarPlato);
platoRouter.put("/:id",ActualizaPlato);
platoRouter.get("/",AllPlato);

export default platoRouter;