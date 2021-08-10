var sha1 = require("sha1");
const Usuario = require("../model/Usuario");
const trataRequest = require("../tratamento/padronizaRequest");
const validation = require("../tratamento/validation");

class UsuarioController {
  async store(req, res) {
    let cpf = req.body.cpf;
    let senha = sha1(req.body.senha);
    if (validation(cpf)) {
      const data = await Usuario.create({ ...req.body, ativo: true, senha });
      return res.json(data);
    } else {
      res.status(200).send({ status: false, mensagem: "cpf invalido" });
    }
  }

  async index(req, res) {
    const data = await Usuario.find({});
    return res.json(data);
  }

  async set(req, res) {
    let cpf = req.body.cpf;

    let request = {
      tel: req.body.tel,
      email: req.body.email,
      ativo: req.body.ativo,
      senha: req.body.senha && sha1(req.body.senha),
      notification: req.body.notification,
      logradouro: req.body.logradouro,
    };

    const data = await Usuario.updateOne({ cpf: cpf }, trataRequest(request));

    if (data.nModified === 0) {
      res.status(200).send({ status: false, mensagem: "cpf não encontrado" });
    } else {
      res.status(200).send({
        status: true,
        mensagem: `${cpf} editado com sucesso!`,
      });
    }
  }
  async del(req, res) {
    let cpf = req.body.cpf;
    const data = await Usuario.updateOne({ cpf: cpf }, { ativo: false });

    if (data.nModified === 0) {
      res.status(200).send({ status: false, mensagem: "cpf não encontrado" });
    } else {
      res.status(200).send({
        status: true,
        mensagem: `${cpf} desativado com sucesso!`,
      });
    }
  }
}

module.exports = new UsuarioController();
