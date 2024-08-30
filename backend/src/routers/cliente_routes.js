import { Router } from "express";
const router = Router();

import {
  loginCleinte,
  registrarCliente,
  perfilCliente,
  TicketporCliente,
  ResponderTicketCliente,
} from "../controllers/cliente_controller.js";

router.post("/login", loginCleinte);
router.post("/registro", registrarCliente);
router.get("/perfilCliente", perfilCliente);
router.get("/ticketsporCliente", TicketporCliente);
router.post("/RespuestaTicketCliente", ResponderTicketCliente);

export default router;
