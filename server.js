const express = require("express");
// const cors = require("cors");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const rota = require("./routes");
var assert = require("assert");

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(
  "mongodb+srv://root:123@cluster0.wnxni.mongodb.net/api-posto",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  }
);

app.use("/", rota);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("servidor rodando ");
});
