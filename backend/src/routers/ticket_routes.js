import { Router } from "express";
const router = Router();

import {
  detalleTicket,
  registrarTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
} from "../controllers/tickets_controller.js";

router.post("/ticket/registro", registrarTicket);

router.get("/ticket/:id", detalleTicket);

router.put("/actualizarTicket/:id", actualizarTicket);

router.delete("/eliminarTicket/:id", eliminarTicket);

router.post("/estadoTicket/:id", cambiarEstado);

export default router;
