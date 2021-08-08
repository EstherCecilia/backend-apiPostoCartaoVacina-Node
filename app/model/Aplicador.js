const mongoose = require("mongoose");

const AplicadorSchema = new mongoose.Schema(
  {
    cpf: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cr: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    dt_nascimento: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
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

module.exports = mongoose.model("Aplicador", AplicadorSchema);
