import { Router } from "express";
const router = Router();

import {
  detalleTicket,
  registrarTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
  responderTicket,
} from "../controllers/tickets_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/ticket/registro", verificarAutenticacion, registrarTicket);

router.post("/ticketRespuesta/:id", verificarAutenticacion, responderTicket);

router.get("/ticket/:id", verificarAutenticacion, detalleTicket);

router.put("/actualizarTicket/:id", verificarAutenticacion, actualizarTicket);

router.delete("/eliminarTicket/:id", verificarAutenticacion, eliminarTicket);

router.post("/estadoTicket/:id", verificarAutenticacion, cambiarEstado);

export default router;
