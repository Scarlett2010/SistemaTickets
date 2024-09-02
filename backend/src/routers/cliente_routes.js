import { Router } from "express";
const router = Router();

import {
  loginCleinte,
  registrarCliente,
  detalleCliente,
  TicketporCliente,
  listarTecnico,
} from "../controllers/cliente_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/loginCliente", loginCleinte);
router.post("/registro", registrarCliente);
router.get("/descripcionCliente/:id", verificarAutenticacion, detalleCliente);
router.get("/ticketsporCliente/:id", verificarAutenticacion, TicketporCliente);
router.get("/listarTecnicos", listarTecnico);

export default router;
