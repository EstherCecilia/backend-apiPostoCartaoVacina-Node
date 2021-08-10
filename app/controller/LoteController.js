const Lote = require("../model/Lote");
const Vacina = require("../model/Vacina");
const trataRequest = require("../tratamento/padronizaRequest");

class LoteController {
  async store(req, res) {
    let cod_vacina = req.body.cod_vacina;

    let vac = await Vacina.findOne({ cod: cod_vacina });

    if (vac !== null) {
      try {
        const data = await Lote.create(req.body);
        res.status(200).send({
          status: true,
          mensagem: `${data.name} criado com sucesso!`,
        });
      } catch (err) {
        res.status(200).send({
          status: false,
          mensagem: `Erro ao criar`,
        });
      }
    } else {
      res
        .status(200)
        .send({ status: false, mensagem: "cod de vacina não encontrado" });
    }
  }

  async index(req, res) {
    const data = await Lote.find({});
    return res.json(data);
  }

  async set(req, res) {
    let cod = req.body.cod;

    let request = {
      cod: req.body.cod,
      quantidade: req.body.quantidade,
      fabricante: req.body.fabricante,
      dt_criacao: req.body.dt_criacao,
    };

    const data = await Lote.updateOne({ cod: cod }, trataRequest(request));

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
    const data = await Lote.findOneAndDelete({ cod: cod });

    if (data === null) {
      res.status(200).send({ status: false, mensagem: "cod não encontrado" });
    } else {
      res.status(200).send({
        status: true,
        mensagem: `${data.cod} deletado com sucesso!`,
      });
    }
  }
}

module.exports = new LoteController();
