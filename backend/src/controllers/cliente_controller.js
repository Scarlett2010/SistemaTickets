import Cliente from "../models/Clientes.js";
import Ticket from "../models/Ticket.js";
import tecnicos from "../models/Tecnico.js";
import generarJWT from "../helpers/crearJWT.js";
import mongoose from "mongoose";
const loginCleinte = async (req, res) => {
  const { email, password } = req.body;

  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  const clienteBDD = await Cliente.findOne({ email }).select(
    "-status -__v -token -updatedAt -createdAt"
  );

  if (clienteBDD?.confirmEmail === false)
    return res
      .status(403)
      .json({ msg: "Lo sentimos, debe verificar su cuenta" });

  if (!clienteBDD)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });

  const verificarPassword = await clienteBDD.matchPassword(password);

  if (!verificarPassword)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, el password no es el correcto" });

  const token = generarJWT(clienteBDD._id, "cliente");

  const { nombre, apellido, direccion, telefono, _id } = clienteBDD;

  res.status(200).json({
    token,
    nombre,
    apellido,
    direccion,
    telefono,
    _id,
    email: clienteBDD.email,
    rol: "cliente",
  });
};

const registrarCliente = async (req, res) => {
  const { email, password } = req.body;
  if (Object.values(req.body).includes(""))
    return res.status(400).json({
      msg: "Lo sentimos debe llenar todos los campos",
    });
  const emailEncontrado = await Cliente.findOne({ email });
  if (emailEncontrado)
    return res.status(400).json({
      msg: "Lo sentimos este email, ya se encuentra registrado",
    });

  const nuevoCliente = new Cliente(req.body);
  nuevoCliente.password = await nuevoCliente.encrypPassword(password);

  const token = nuevoCliente.crearToken();
  await nuevoCliente.save();
  console.log(token);

  res.status(200).json({ msg: "Cliente registrado" });
};

const perfilCliente = (req, res) => {
  delete req.cliente.createdAt;
  delete req.cliente.updatedAt;
  delete req.cliente.__v;

  res.status(200).json(req.cliente);
};

const detalleCliente = async (req, res) => {
  const { id } = req.params;
  const clienteBDD = await Cliente.findById(id);
  res.status(200).json(clienteBDD);
};

const TicketporCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const tickets = await Ticket.find({ cliente: id }).select("id descripcion tecnico estado");
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

const listarTecnico = async (req, res) => {
  const tecnico = await tecnicos.find().select("nombre email genero");
  res.status(200).json(tecnico);
};

export {
  loginCleinte,
  registrarCliente,
  perfilCliente,
  detalleCliente,
  TicketporCliente,
  listarTecnico,
};
