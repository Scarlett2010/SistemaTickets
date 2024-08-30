import { Router } from "express";
const router = Router();

import {
  loginCleinte,
  registrarCliente,
  detalleCliente,
  TicketporCliente,
  ResponderTicketCliente,
} from "../controllers/cliente_controller.js";

router.post("/loginCliente", loginCleinte);
router.post("/registro", registrarCliente);
router.get("/descripcionCliente/:id", detalleCliente);
router.get("/ticketsporCliente", TicketporCliente);
router.post("/RespuestaTicketCliente", ResponderTicketCliente);

export default router;
