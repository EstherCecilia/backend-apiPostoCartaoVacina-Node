const Aplicador = require("../model/Aplicador");
const trataRequest = require("../tratamento/padronizaRequest");
const validation = require("../tratamento/validation");

class AplicadorController {
  async store(req, res) {
    let cpf = req.body.cpf;
    if (validation(cpf)) {
      const data = await Aplicador.create({ ...req.body, ativo: true });
      return res.json(data);
    } else {
      res.status(200).send({ status: false, mensagem: "cpf invalido" });
    }
  }

  async index(req, res) {
    const data = await Aplicador.find({});
    return res.json(data);
  }

  async set(req, res) {
    let cpf = req.body.cpf;

    let request = {
      tel: req.body.tel,
      email: req.body.email,
      ativo: req.body.ativo,
      senha: req.body.senha,
      admin: req.body.admin,
    };

    const data = await Aplicador.updateOne({ cpf: cpf }, trataRequest(request));

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
    const data = await Aplicador.updateOne({ cpf: cpf }, { ativo: false });

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

module.exports = new AplicadorController();
