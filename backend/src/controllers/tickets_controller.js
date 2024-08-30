import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";

// Obtener los detalles de un ticket
const detalleTicket = async (req, res) => {
  const { id } = req.params;
  const ticketBDD = await Ticket.findById(id);
  res.status(200).json(ticketBDD);
};

// Registrar un nuevo ticket
const registrarTicket = async (req, res) => {
  const { codigo, tecnico, descripcion } = req.body;
  if (Object.values(req.body).includes(""))
    return res.status(400).json({
      msg: "Lo sentimos debe llenar todos los campos",
    });
  const codigoEncontrado = await Ticket.findOne({ codigo });
  if (codigoEncontrado)
    return res.status(400).json({
      msg: "Lo sentimos este ticket, ya se encuentra registrado",
    });

  const nuevoTicket = new Ticket(req.body);
  await nuevoTicket.save();
  res.status(200).json({ msg: "Ticket registrado" });
};

// Actualizar un ticket existente
const actualizarTicket = async (req, res) => {
  const { id } = req.params;
  if (Object.values(req.body).includes("")) {
    return res
      .status(400)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ msg: `Lo sentimos, no existe el ticket ${id}` });
  }
  await Ticket.findByIdAndUpdate(id, req.body);
  res.status(200).json({ msg: "Actualización exitosa del ticket" });
};

// Eliminar un ticket
const eliminarTicket = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Lo sentimos, no existe ese ticket` });
  }
  await Ticket.findByIdAndDelete(id);
  res.status(200).json({ msg: "Ticket eliminado exitosamente" });
};

// Cambiar el estado de un ticket
const cambiarEstado = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: `Lo sentimos, no existe ese ticket` });
  }
  await Ticket.findByIdAndUpdate(id, { default: "pendiente" });
  res.status(200).json({ msg: "Estado del ticket modificado exitosamente" });
};

export {
  detalleTicket,
  registrarTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
};
