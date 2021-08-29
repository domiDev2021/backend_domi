const PersonaisRepository = require('../repositories/PersonaisRepository');

class PersonalController {
  // list all personais
  async index(request, response) {
    const personais = await PersonaisRepository.findAll();

    response.json(personais);
  }

  // create personal
  async store(request, response) {
    const {
      nome, email, telefone, cpf, agencia, conta, codigo_banco, pix,
    } = request.body;

    if (!nome) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const personal = await PersonaisRepository.createPersonal({
      nome, email, telefone, cpf, agencia, conta, codigo_banco, pix,
    });

    response.json(personal);
  }
}

module.exports = new PersonalController();
