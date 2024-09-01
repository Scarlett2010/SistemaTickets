import { Router } from "express";
const router = Router();

import {
  login,
  registrarTecnico,
  //perfilTecnico,
  TicketporTecnico,
  detalleTecnico,
} from "../controllers/tecnico_controller.js";

router.post("/login", login);
router.post("/registroTecnico", registrarTecnico);
//router.get("/perfilTecnico", perfilTecnico);
router.get("/descripcionTecnico/:id", detalleTecnico);
router.get("/ticketsporTecnico/:id", TicketporTecnico);

export default router;
