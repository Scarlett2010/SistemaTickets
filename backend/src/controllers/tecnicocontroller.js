import Tecnico from "../models/Tecnico.js";
const login = async (req, res) => {
  const { email, password } = req.body;

  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  const tecnicoBDD = await Tecnico.findOne({ email }).select(" -token ");

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

  const token = generarJWT(tecnicoBDD._id, "veterinario");

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

const registrarTecnico = async (req, res) => {
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

/*perfil de usuario */
const perfil = async (req, res) => {
  re;
};

export { login, registrarTecnico };
