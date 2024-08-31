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

router.post("/ticket/registro", registrarTicket);

router.post("/ticketRespuesta/:id", responderTicket);

router.get("/ticket/:id", detalleTicket);

router.put("/actualizarTicket/:id", actualizarTicket);

router.delete("/eliminarTicket/:id", eliminarTicket);

router.post("/estadoTicket/:id", cambiarEstado);

export default router;
