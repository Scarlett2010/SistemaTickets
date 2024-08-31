import mongoose, { Schema, model } from "mongoose";

const ticktsSchema = new Schema({
  codigo: {
    type: Number,
    required: true,
    trim: true,
  },
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
    required: false,
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
