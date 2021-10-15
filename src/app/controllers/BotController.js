const BotRepository = require('../repository/BotRepository');
// require('dotenv').config();
// const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

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

    const objetoRequest = {
      PersonalNome,
      pix,
      nome,
      celular,
      plano,
      data_vencimento,
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

  // enviaMenssagem(dados) {
  //   const { x };
  //   const parametros = {};

  //   client.studio.flows(process.env.BOT_TOKEN)
  //     .executions
  //     .create({
  //       to: `+55${}`,
  //       from: '',
  //       parameters: parametros
  //     })
  //     .then(execution => console.log(execution.sid));

  // }
}

module.exports = new BotController();
