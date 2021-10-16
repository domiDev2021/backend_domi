const moment = require('moment');
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const BotRepository = require('../repository/BotRepository');
require('dotenv').config();

class BotController {
  async getPersonalDataByPhone(request, response) {
    const { phone } = request.params;
    const result = await BotRepository.getPersonalDataByPhone(phone);
    const
      {
        PersonalNome,
        pix,
        nome,
        celular,
        plano,
        data_vencimento,
      } = result[0];

    let totalPagar = 0;
    let aulasDisponiveis = 0;
    let valorPorAula = 0;
    if (result[0].aulas_pacote === 0) {
      totalPagar = result[0].valor_aula;
    } else {
      totalPagar = result[0].aulas_feitas * result[0].valor_aula;
      aulasDisponiveis = result[0].aulas_pacote - result[0].aulas_feitas;
      valorPorAula = result[0].valor_aula;
    }

    const [primeiroNome] = nome.split(' ');
    const dataVencimento = moment(data_vencimento).local().format('DD-MM-YYYY');

    const objetoRequest = {
      PersonalNome,
      pix,
      primeiroNome,
      celular,
      plano,
      data_vencimento: dataVencimento,
      totalPagar,
      aulasDisponiveis,
      valorPorAula,
    };

    response.json(objetoRequest);
  }

  async mudaStatusComprovante(request, response) {
    const { phone } = request.params;
    const result = BotRepository.changeAlunoComprovante(phone);

    response.status(200).send();
  }

  enviaMenssagem(dados) {
    let parametros = {};
    const {
      plano, gatilho, nome, PersonalNome, celular, pix,
    } = dados;

    if (plano === 'Mensal') {
      const { data_vencimento, totalPagar } = dados;
      parametros = {
        gatilho,
        plano,
        nome,
        PersonalNome,
        pix,
        celular,
        data_vencimento,
        totalPagar,
      };
    } else if (plano === 'Diario') {
      const { aulasDisponiveis, totalPagar, valorPorAula } = dados;
      parametros = {
        gatilho,
        plano,
        nome,
        PersonalNome,
        pix,
        celular,
        aulasDisponiveis,
        totalPagar,
        valorPorAula,
      };
    }
    // console.log(parametros);
    client.studio.flows(process.env.BOT_TOKEN)
      .executions
      .create({
        to: `+55${celular}`,
        from: process.env.PHONE,
        parameters: parametros,
      })
      .then((execution) => console.log(execution.sid));
  }
}

module.exports = new BotController();
