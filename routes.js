const express = require("express");
const routes = express.Router();

const AplicadorController = require("./app/controller/AplicadorController");
const UsuarioController = require("./app/controller/UsuarioController");
const VacinaController = require("./app/controller/VacinaController");
const LoteController = require("./app/controller/LoteController");
const RegistroController = require("./app/controller/RegistroController");
const LoginController = require("./app/controller/LoginController");

routes.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//route login
routes.post("/login", LoginController.index);

//routes aplicador
routes.get("/aplicador", AplicadorController.index);

routes.post("/aplicador", AplicadorController.store);

routes.put("/aplicador", AplicadorController.set);

routes.post("/del/aplicador", AplicadorController.del);

//routes usuario
routes.get("/usuario", UsuarioController.index);

routes.post("/usuario", UsuarioController.store);

routes.put("/usuario", UsuarioController.set);

routes.post("/del/usuario", UsuarioController.del);

//routes vacina
routes.get("/vacina", VacinaController.index);

routes.post("/vacina", VacinaController.store);

routes.put("/vacina", VacinaController.set);

routes.post("/del/vacina", VacinaController.del);

//routes lote
routes.get("/lote", LoteController.index);

routes.post("/lote", LoteController.store);

routes.put("/lote", LoteController.set);

routes.post("/del/lote", LoteController.del);

//routes registro
routes.get("/registro", RegistroController.index);

routes.post("/registro", RegistroController.store);

routes.put("/registro", RegistroController.set);

routes.post("/del/registro", RegistroController.del);

module.exports = routes;
