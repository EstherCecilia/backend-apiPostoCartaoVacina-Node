const Vacina = require("../model/Vacina");
const trataRequest = require("../tratamento/padronizaRequest");

class VacinaController {
  async store(req, res) {
    const data = await Vacina.create(req.body);

    return res.json(data);
  }

  async index(req, res) {
    const data = await Vacina.find({});
    return res.json(data);
  }

  async set(req, res) {
    let cod = req.body.cod;

    let request = {
      name: req.body.name,
      cod: req.body.cod,
      description: req.body.description,
      dt_fabricacao: req.body.dt_fabricacao,
      dt_validade: req.body.dt_validade,
    };

    const data = await Vacina.updateOne({ cod: cod }, trataRequest(request));

    if (data.nModified === 0) {
      res.status(200).send({ status: false, mensagem: "cod não encontrado" });
    } else {
      res.status(200).send({
        status: true,
        mensagem: `${cod} editado com sucesso!`,
      });
    }
  }
  async del(req, res) {
    let cod = req.body.cod;
    const data = await Vacina.findOneAndDelete({ cod: cod });

    if (data === null) {
      res.status(200).send({ status: false, mensagem: "cod não encontrado" });
    } else {
      res.status(200).send({
        status: true,
        mensagem: `${data.name} deletado com sucesso!`,
      });
    }
  }
}

module.exports = new VacinaController();
