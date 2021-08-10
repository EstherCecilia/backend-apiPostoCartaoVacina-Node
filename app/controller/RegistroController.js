const Registro = require("../model/Registro");
const Lote = require("../model/Lote");
const Vacina = require("../model/Vacina");
const Aplicador = require("../model/Aplicador");
const Usuario = require("../model/Usuario");
const trataRequest = require("../tratamento/padronizaRequest");
const campoError = require("../tratamento/campoError");

async function testeRegistros(
  cod_vacina,
  cod_lote,
  cpf_aplicador,
  cpf_usuario
) {
  let vacina = await Vacina.findOne({ cod: cod_vacina });
  let lote = await Lote.findOne({ cod: cod_lote });
  let aplicador = await Aplicador.findOne({ cpf: cpf_aplicador });
  let usuario = await Usuario.findOne({ cpf: cpf_usuario });

  return { vacina, lote, aplicador, usuario };
}
class RegistroController {
  async store(req, res) {
    const { cod_vacina, cod_lote, cpf_aplicador, cpf_usuario } = req.body;

    const { vacina, lote, aplicador, usuario } = await testeRegistros(
      cod_vacina,
      cod_lote,
      cpf_aplicador,
      cpf_usuario
    );

    if (
      vacina !== null &&
      lote !== null &&
      aplicador !== null &&
      usuario !== null
    ) {
      const data = await Registro.create({
        ...req.body,
        ativo: true,
        aplicador: aplicador.name,
        usuario: usuario.name,
        vacina: vacina.name,
      });
      res.status(200).send({ status: true, data });
    } else {
      res.status(200).send({
        status: false,
        mensagem: `${campoError([
          { label: "cod_vacina", value: vacina },
          { label: "cod_lote", value: lote },
          { label: "cpf_aplicador", value: aplicador },
          { label: "cpf_usuario", value: usuario },
        ])} não conferem`,
      });
    }
  }

  async index(req, res) {
    const data = await Registro.find({});
    return res.json(data);
  }

  async set(req, res) {
    const {
      ativo,
      cod,
      cpf_usuario,
      cpf_aplicador,
      dt,
      dose,
      cod_vacina,
      cod_lote,
    } = req.body;

    const { vacina, lote, aplicador, usuario } = await testeRegistros(
      cod_vacina,
      cod_lote,
      cpf_aplicador,
      cpf_usuario
    );

    if (
      vacina !== null &&
      lote !== null &&
      aplicador !== null &&
      usuario !== null
    ) {
      let request = {
        cpf_usuario,
        cpf_aplicador,
        dt,
        ativo,
        dose,
        cod_vacina,
        cod_lote,
      };
      const data = await Registro.updateOne(
        { cod: cod },
        trataRequest(request)
      );

      if (data.nModified === 0) {
        res.status(200).send({ status: false, mensagem: "cod não encontrado" });
      } else {
        res.status(200).send({
          status: true,
          mensagem: `${cod} editado com sucesso!`,
        });
      }
    } else {
      res.status(200).send({
        status: false,
        mensagem: `${campoError([
          { label: "cod_vacina", value: vacina },
          { label: "cod_lote", value: lote },
          { label: "cpf_aplicador", value: aplicador },
          { label: "cpf_usuario", value: usuario },
        ])} não conferem`,
      });
    }
  }
  async del(req, res) {
    let cod = req.body.cod;
    const data = await Registro.updateOne({ cod: cod }, { ativo: false });

    if (data.nModified === 0) {
      res.status(200).send({ status: false, mensagem: "cod não encontrado" });
    } else {
      res.status(200).send({
        status: true,
        mensagem: `${cod} desativado com sucesso!`,
      });
    }
  }
}

module.exports = new RegistroController();
