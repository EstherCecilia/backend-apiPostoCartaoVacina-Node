const mongoose = require("mongoose");

const RegistroSchema = new mongoose.Schema(
  {
    cod: {
      type: String,
      required: true,
    },
    cpf_usuario: {
      type: String,
      required: true,
    },

    cpf_aplicador: {
      type: String,
      required: true,
    },
    dt: {
      type: Date,
      required: true,
    },
    dose: {
      type: Number,
      required: true,
    },
    cod_vacina: {
      type: String,
      required: true,
    },
    cod_lote: {
      type: String,
      required: true,
    },
    aplicador: {
      type: String,
      required: true,
    },
    usuario: {
      type: String,
      required: true,
    },
    vacina: {
      type: String,
      required: true,
    },
    ativo: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registro", RegistroSchema);
