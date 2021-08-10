var sha1 = require("sha1");
const Aplicador = require("../model/Aplicador");
const trataRequest = require("../tratamento/padronizaRequest");

class AplicadorController {
  async index(req, res) {
    let email = req.body.email;
    let cpf = req.body.cpf;
    let senha = sha1(req.body.senha);

    const data = await Aplicador.findOne({
      ...trataRequest({ email, cpf }),
      senha,
    });

    if (data === null) {
      return res.json({ status: false, mensagem: "usuario não encontrado" });
    } else {
      return res.json({ status: true, data });
    }
  }
}

module.exports = new AplicadorController();
