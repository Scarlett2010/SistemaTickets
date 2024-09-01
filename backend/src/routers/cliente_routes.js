import { Router } from "express";
const router = Router();

import {
  loginCleinte,
  registrarCliente,
  detalleCliente,
  TicketporCliente,
  listarTecnico,
} from "../controllers/cliente_controller.js";

router.post("/loginCliente", loginCleinte);
router.post("/registro", registrarCliente);
router.get("/descripcionCliente/:id", detalleCliente);
router.get("/ticketsporCliente/:id", TicketporCliente);
router.get("/listarTecnicos", listarTecnico);

export default router;
