import Cliente from "../models/Clientes.js";
import Ticket from "../models/Ticket.js";
const loginCleinte = async (req, res) => {
  const { email, password } = req.body;

  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  const clienteBDD = await Cliente.findOne({ email }).select(" -token ");

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
  const emailEncontrado = await Usuarios.findOne({ email });
  if (emailEncontrado)
    return res.status(400).json({
      msg: "Lo sentimos este email, ya se encuentra registrado",
    });

  const nuevoUsuario = new Usuarios(req.body);
  nuevoUsuario.password = await nuevoUsuario.encrypPassword(password);

  const token = nuevoUsuario.createToken();
  //await enviarCorreoUsuario(email, token)
  await nuevoUsuario.save();
  res.status(200).json({ msg: "Revisa tu correo para verificar tu cuenta" });
};

const perfilCliente = (req, res) => {
  delete req.cliente.createdAt;
  delete req.cliente.updatedAt;
  delete req.cliente.__v;

  res.status(200).json(req.cliente);
};

const TicketporCliente = async (req, res) => {
  try {
    const tickets = await Ticket.find({ cliente: req.cliente._id });
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

const ResponderTicketCliente = async (req, res) => {
  try {
    const { respuesta } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: "Ticket no encontrado" });
    }
    if (ticket.cliente.toString() !== req.cliente._id.toString()) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    ticket.respuesta = respuesta;
    await ticket.save();
    res.status(200).json({ msg: "Respuesta guardada" });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

export {
  loginCleinte,
  registrarCliente,
  perfilCliente,
  TicketporCliente,
  ResponderTicketCliente,
};
