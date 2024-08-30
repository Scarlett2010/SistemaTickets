import { Router } from "express";
const router = Router();

import {
  detalleTicket,
  registrarTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
} from "../controllers/tickets_controller.js";

// Ruta para crear el ticket
router.post("/ticket/registro", registrarTicket);

// Ruta para ver el detalle del ticket
router.get("/ticket/:id", detalleTicket);

// Ruta para actualizar el ticket
router.put("/tratamiento/:id", actualizarTicket);

// Ruta para eliminar el tickt
router.delete("/tratamiento/:id", eliminarTicket);

// Ruta para cambiar el estado del tratamiento
router.post("/ticket/estado/:id", cambiarEstado);

export default router;
