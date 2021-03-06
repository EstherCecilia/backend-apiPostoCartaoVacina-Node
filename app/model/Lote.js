const mongoose = require("mongoose");

const LoteSchema = new mongoose.Schema(
  {
    cod: {
      type: String,
      required: true,
    },
    dt_criacao: {
      type: Date,
      required: true,
    },
    quantidade: {
      type: Number,
      required: true,
    },

    fabricante: {
      type: String,
      required: true,
    },
    cod_vacina: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lote", LoteSchema);
