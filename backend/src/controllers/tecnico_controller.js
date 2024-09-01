import Tecnico from "../models/Tecnico.js";
import Ticket from "../models/Ticket.js";
import generarJWT from "../helpers/crearJWT.js";
import mongoose from "mongoose";
//import generarJWT from "../helpers/crearJWT.js";

/*--------------------------------------------*/
const login = async (req, res) => {
  const { email, password } = req.body;

  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  const tecnicoBDD = await Tecnico.findOne({ email }).select(
    "-status -__v -token -updatedAt -createdAt"
  );

  if (tecnicoBDD?.confirmEmail === false)
    return res
      .status(403)
      .json({ msg: "Lo sentimos, debe verificar su cuenta" });

  if (!tecnicoBDD)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });

  const verificarPassword = await tecnicoBDD.matchPassword(password);

  if (!verificarPassword)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, el password no es el correcto" });

  const token = generarJWT(tecnicoBDD._id, "tecnico");

  const { nombre, apellido, direccion, telefono, _id } = tecnicoBDD;

  res.status(200).json({
    token,
    nombre,
    apellido,
    direccion,
    telefono,
    _id,
    email: tecnicoBDD.email,
    rol: "tecnico",
  });
};
/*------------------------------------------- */

const registrarTecnico = async (req, res) => {
  const { email, password } = req.body;
  if (Object.values(req.body).includes(""))
    return res.status(400).json({
      msg: "Lo sentimos debe llenar todos los campos",
    });
  const emailEncontrado = await Tecnico.findOne({ email });
  if (emailEncontrado)
    return res.status(400).json({
      msg: "Lo sentimos este email, ya se encuentra registrado",
    });

  const nuevoTecnico = new Tecnico(req.body);
  nuevoTecnico.password = await nuevoTecnico.encrypPassword(password);

  const token = nuevoTecnico.crearToken();
  await nuevoTecnico.save();
  console.log(token);

  res.status(200).json({ msg: "Tecnico registrado" });
};

const perfilTecnico = (req, res) => {
  delete req.tecnicoBDD.token;
  delete req.tecnicoBDD.createdAt;
  delete req.tecnicoBDD.updatedAt;
  delete req.tecnicoBDD.__v;
  res.status(200).json(req.tecnicoBDD);
};

const detalleTecnico = async (req, res) => {
  const { id } = req.params;
  const tecnicoBDD = await Tecnico.findById(id);
  res.status(200).json(tecnicoBDD);
};

const TicketporTecnico = async (req, res) => {
  try {
    const { id } = req.params;
    const tickets = await Ticket.find({ tecnico: id }).select(
      "id descripcion cliente estado"
    );
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

export {
  login,
  registrarTecnico,
  perfilTecnico,
  detalleTecnico,
  TicketporTecnico,
};
