import { Router } from "express";
const router = Router();

import {
  login,
  registrarTecnico,
  //perfilTecnico,
  TicketporTecnico,
  ResponderTicket,
  cambiarestadoTicket,
  detalleTecnico,
} from "../controllers/tecnico_controller.js";

router.post("/login", login);
router.post("/registroTecnico", registrarTecnico);
//router.get("/perfilTecnico", perfilTecnico);
router.get("/descripcionTecnico/:id", detalleTecnico);
router.get("/ticketsporTecnico", TicketporTecnico);
router.post("/RespuestaTicket", ResponderTicket);
router.put("/cambiarEstadoTicket", cambiarestadoTicket);

export default router;
