const AlunoRepository = require('../repository/AlunoRepository');
const LancamentoRepository = require('../repository/LancamentoRepository');
const PersonalRepository = require('../repository/PersonalRepository');

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
      id_personal,
      nome, plano,
      celular, data_vencimento, aulas_pacote, aulas_feitas,
    }] = await AlunoRepository.listTelefoneByStatusPagamento(bool);

    const [result] = await PersonalRepository.listPersonaisById(id_personal);

    const nomeDoPersonal = result.nome;
    console.log(nomeDoPersonal);
    response.json({
      nomeDoPersonal,
      nome,
      plano,
      celular,
      aulas_feitas,
      aulas_pacote,
      data_vencimento,
    });
  }

  async filtroPorMesAlunos(request, response) {
    const results = await LancamentoRepository.JoinLancamentoAlunos();
    const chavesPermitidas = ['nome', 'aulas_feitas', 'valor_aula', 'data_inicial', 'quantidade'];
    const resultFiltrado = results.map((result) => {
      const keys = Object.keys(result);
      const chavesFiltradas = keys.filter((key) => chavesPermitidas.includes(key));
      const listReduce = chavesFiltradas.reduce((objeto, chave) => {
        objeto[chave] = result[chave];
        return objeto;
      }, {});
      return listReduce;
    });

    const dicionarioCompleto = resultFiltrado.map((objeto) => (
      {
        ...objeto,
        faturamento: (objeto.valor_aula * objeto.quantidade),
        dia: objeto.data_inicial.getDate(),
      }
    ));

    const filtroAplicado = dicionarioCompleto.map((objeto) => {
      let semana = 0;
      if (objeto.dia <= 7) {
        semana = 1;
      } else if (objeto.dia > 7 && objeto.dia <= 15) {
        semana = 2;
      } else if (objeto.dia > 15 && objeto.dia <= 21) {
        semana = 3;
      } else if (objeto.dia > 21 && objeto.dia <= 27) {
        semana = 4;
      } else {
        semana = 5;
      }

      return { ...objeto, semana };
    });

    response.json(filtroAplicado);
  }
}

module.exports = new AlunoController();
