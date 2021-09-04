const PersonalRepository = require('../repository/PersonalRepository');

class PersonalController {
  async registerPersonal(request, response) {
    const {
      nome,
      email,
      telefone,
      cpf,
      agencia,
      conta,
      codigo_banco,
      pix,
    } = request.body;
    const personalData = {
      nome, email, telefone, cpf, agencia, conta, codigo_banco, pix,
    };

    console.log(cpf);
    console.log(personalData);
    const result = await PersonalRepository.registerPersonal(personalData);
    response.json(result);
  }

  async listPersonais(request, response) {
    const result = await PersonalRepository.listPersonais();
    response.json(result);
  }
}

module.exports = new PersonalController();
