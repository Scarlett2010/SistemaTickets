import { Schema, model } from "mongoose";

const tecnicoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  cedula: {
    type: Number,
    required: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  ciudad: {
    type: Number,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: null,
  },
});

tecnicoSchema.methods.crearToken = function () {
  const tokenGenerado = (this.token = Math.random().toString(36).slice(2));
  return tokenGenerado;
};

export default model("Tecnico", tecnicoSchema);
