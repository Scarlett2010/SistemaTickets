import mongoose, { Schema, model } from "mongoose";

const ticktSchema = new Schema({
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
  respuesta: [
    {
      texto: {
        type: String,
        required: true,
      },
      tecnico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tecnico",
        required: true,
      },
    },
  ],
});

export default model("Ticket", ticktSchema);
