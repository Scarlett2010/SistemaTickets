import { Router } from "express";
const router = Router();

import {
  login,
  registrarTecnico,
  TicketporTecnico,
  detalleTecnico,
} from "../controllers/tecnico_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/login", login);
router.post("/registroTecnico", registrarTecnico);
router.get("/descripcionTecnico/:id", verificarAutenticacion,detalleTecnico);
router.get("/ticketsporTecnico/:id", verificarAutenticacion,TicketporTecnico);

export default router;
