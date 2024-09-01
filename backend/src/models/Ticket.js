import mongoose, { Schema, model } from "mongoose";

const ticktsSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tecnico",
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
  },
  estado: {
    type: String,
    required: true,
    default: "Pendiente",
  },
  respuesta: {
    type: String,
    default: null,
  },
  tecnico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tecnico",
  },
});

ticktsSchema.methods.responder = async function (respuesta) {
  this.respuesta = respuesta;
  this.save();
};

export default model("Tickets", ticktsSchema);
