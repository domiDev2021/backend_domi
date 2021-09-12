const AlunoRepository = require('../repository/AlunoRepository');

class AlunoController {
  async registerAluno(request, response) {
    const {
      id_personal,
      nome,
      celular,
      plano,
      aulas_feitas,
      aulas_pacote,
      valor_aula,
      status_pagamento,
      data_vencimento,
    } = request.body;

    const result = await AlunoRepository.registerAluno(
      {
        id_personal,
        nome,
        celular,
        plano,
        aulas_feitas,
        aulas_pacote,
        valor_aula,
        status_pagamento,
        data_vencimento,
      },
    );

    response.json(result);
  }

  async listByPersonalId(request, response) {
    const { id } = request.params;
    console.log(id);
    const result = await AlunoRepository.listByPersonalId(id);

    response.json(result);
  }

  async listAlunos(request, response) {
    const result = await AlunoRepository.listAlunos();

    response.json(result);
  }

  async updateAlunos(request, response) {
    const {
      id_personal,
      id_aluno,
      nome,
      celular,
      plano,
      aulas_feitas,
      aulas_pacote,
      valor_aula,
      status_pagamento,
    } = request.body;

    const result = await AlunoRepository.updateAluno(
      [
        id_personal,
        id_aluno,
        nome,
        celular,
        plano,
        aulas_feitas,
        aulas_pacote,
        valor_aula,
        status_pagamento,
        id_aluno,
      ],
    );

    response.json(result);
  }

  async deleteAluno(request, response) {
    const { id } = request.params;

    await AlunoRepository.deleteAluno(id);

    response.sendStatus(204);
  }
}

module.exports = new AlunoController();
