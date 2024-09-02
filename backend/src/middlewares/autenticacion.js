// Importar JWT y el Modelo
import jwt from "jsonwebtoken";
import Tecnico from "../models/Tecnico.js";
import Cliente from "../models/Clientes.js";

// Método para proteger rutas
const verificarAutenticacion = async (req, res, next) => {
  // Validación si se está enviando el token
  if (!req.headers.authorization)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes proprocionar un token" });

  // Desestructurar el token pero del headers
  const { authorization } = req.headers;

  // Capturar errores
  try {
    // verificar el token recuperado con el almacenado
    const { id, rol } = jwt.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );

    // Verificar el rol
    if (rol === "tecnico") {
      // Obtener el usuario
      req.tecnicoBDD = await Tecnico.findById(id).lean().select("-password");
      req.tecnicoBDD.rol = "tecnico";
      // Continue el proceso
      console.log(req.tecnicoBDD);
      next();
    } else if (rol === "cliente") {
      req.clienteBDD = await Cliente.findById(id).lean().select("-password");
      req.clienteBDD.rol = "cliente";
      req.tickets = tickets;
    }
    console.log(req.clienteBDD);
    next();
  } catch (error) {
    // Capturar errores y presentarlos
    const e = new Error("Formato del token no válido");
    return res.status(404).json({ msg: e.message });
  }
};

// Exportar el método
export default verificarAutenticacion;
