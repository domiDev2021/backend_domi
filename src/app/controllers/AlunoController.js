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

  async listByAlunoId(request, response) {
    const { id } = request.params;
    console.log(id);
    const [{
      plano, celular, aulas_feitas, aulas_pacote, valor_aula, status_pagamento, data_vencimento,
    }] = await AlunoRepository.listByAlunoId(id);

    response.json({
      plano, celular, aulas_feitas, aulas_pacote, valor_aula, status_pagamento, data_vencimento,
    });
  }

  async listAlunos(request, response) {
    const result = await AlunoRepository.listAlunos();

    response.json(result);
  }

  async listAlunosTabela(request, response) {
    const result = await AlunoRepository.listAlunosTabela();
    const resultCorrect = result.map((objeto) => (
      { ...objeto, faturamento: (objeto.aulas_feitas * objeto.valor_aula) }
    ));

    response.json(resultCorrect);
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

  async telefonesAlunosByPagamento(request, response) {
    const { bool } = request.params;
    const [{
      celular, data_vencimento, aulas_pacote, aulas_feitas,
    }] = await AlunoRepository.listTelefoneByStatusPagamento(bool);

    response.json({
      celular, aulas_feitas, aulas_pacote, data_vencimento,
    });
  }
}

module.exports = new AlunoController();
