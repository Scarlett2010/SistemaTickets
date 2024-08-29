import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";

// Obtener los detalles de un ticket
const detalleTicket = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ msg: `Lo sentimos, no existe ese ticket ${id}` });
  }
  const ticket = await Ticket.findById(id).populate("tecnico", "_id nombre"); // Cambié 'ticket' a 'tecnico' para referenciar el técnico
  res.status(200).json(ticket);
};

// Registrar un nuevo ticket
const registrarTicket = async (req, res) => {
  const { newticket } = req.body;
  if (!mongoose.Types.ObjectId.isValid(newticket)) {
    return res.status(404).json({ msg: `Lo sentimos, el ticket no es válido` });
  }
  const ticket = await Ticket.create(req.body);
  res
    .status(200)
    .json({ msg: `Registro exitoso del ticket ${ticket._id}`, ticket });
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
  await Ticket.findByIdAndUpdate(id, { estado: false });
  res.status(200).json({ msg: "Estado del ticket modificado exitosamente" });
};

export {
  detalleTicket,
  registrarTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
};
