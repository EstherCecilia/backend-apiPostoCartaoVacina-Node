const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const rota = require("./routes");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect("mongodb+srv://root:124@cluster0.wnxni.mongodb.net/api-posto", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conexão no banco de dados realizada com sucesso");
  })
  .catch((err) => {
    console.log("Conexão com banco de dados não realizada:  " + err);
  });

app.use("/", rota);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("servidor rodando ");
});
