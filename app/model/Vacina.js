const mongoose = require("mongoose");

const VacinaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    cod: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vacina", VacinaSchema);
