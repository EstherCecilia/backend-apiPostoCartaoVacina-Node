const express = require("express");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const rota = require("./routes");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose
  .connect("mongodb+srv://root:123@cluster0.wnxni.mongodb.net/api-posto", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conexão no banco de dados realizada com sucesso");
  })
  .catch(() => {
    console.log("Conexão com banco de dados não realizada");
  });

app.use("/", rota);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("servidor rodando ");
});
