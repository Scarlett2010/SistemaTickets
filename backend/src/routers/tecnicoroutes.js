import { Router } from "express";
const router = Router();

import {
  login,
  registrarTecnico,
  perfilTecnico,
  TicketporTecnico,
  ResponderTicket,
  cambiarestadoTicket,
} from "../controllers/tecnicocontroller.js";

router.post("/login", login);
router.post("/registro", registrarTecnico);
router.get("/perfilTecnico", perfilTecnico);
router.get("/ticketsporTecnico", TicketporTecnico);
router.post("/RespuestaTicket", ResponderTicket);
router.put("/cambiarEstadoTicket", cambiarestadoTicket);

export default router;
