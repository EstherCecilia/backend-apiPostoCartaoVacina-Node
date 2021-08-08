const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const rota = require("./routes");

async function main() {
  let corsOptions = {
    origin: "http://localhost:8081",
  };

  let resBanco = "";

  app.use(cors(corsOptions));
  app.use(express.json());

  await mongoose
    .connect("mongodb+srv://root:123@cluster0.wnxni.mongodb.net/api-posto", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      resBanco = "Conexão no banco de dados realizada com sucesso";
    })
    .catch(() => {
      resBanco = "Conexão com banco de dados não realizada";
    });

  app.use("/", rota);

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(resBanco);
  });
}

main();
