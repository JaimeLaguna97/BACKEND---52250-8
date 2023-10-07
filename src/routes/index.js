import { Router } from "express";
import api_router from "./api/index.js";

const index_router = Router();

index_router.use('/api', api_router); //ENRUTADOR DE RUTAS QUE RESPONDAN CON JSON.

export default index_router;