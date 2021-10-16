const moment = require('moment');

const AlunoRepository = require('../repository/AlunoRepository');
const LancamentoRepository = require('../repository/LancamentoRepository');
const PersonalRepository = require('../repository/PersonalRepository');
const BotController = require('./BotController');

class AlunoController {
  async registerAluno(request, response) {
    const {
      id_personal,
      nome,
      celular,
      plano,
      aulas_pacote,
      valor_aula,
      data_vencimento,
      gatilho, //
      personalNome, //
    } = request.body;

    const dataVencimento = moment(data_vencimento).local().format('YYYY-MM-DD');
    const dataVencimentoBot = moment(data_vencimento).local().format('DD/MM/YYYY');
    const [{ pix }] = await PersonalRepository.listPersonaisById(id_personal);

    const result = await AlunoRepository.registerAluno(
      {
        id_personal,
        nome,
        celular,
        plano,
        aulas_feitas: 0,
        aulas_pacote,
        valor_aula,
        status_pagamento: 0,
        comprovante: 0,
        data_vencimento: dataVencimento,
      },
    );

    let dados = 0;
    if (plano === 'Diario') {
      dados = {
        gatilho,
        plano,
        nome: nome.split(' ')[0],
        personalNome,
        pix,
        celular,
        aulasDisponiveis: aulas_pacote - 0,
        totalPagar: 0,
        valor_aula,
      };
    } else {
      dados = {
        gatilho,
        plano,
        nome: nome.split(' ')[0],
        personalNome,
        pix,
        celular,
        data_vencimento: dataVencimentoBot,
        totalPagar: 0,
      };
    }

    BotController.enviaMenssagem(dados);
    response.json(result);
  }

  async listByPersonalId(request, response) {
    const { id } = request.params;

    const result = await AlunoRepository.listByPersonalId(id);

    response.json(result);
  }

  async listByAlunoId(request, response) {
    const { id } = request.params;

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
      data_vencimento,
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
        data_vencimento,
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
    const lista = await AlunoRepository.listTelefoneByStatusPagamento();

    const result = lista.map((objeto) => {
      let valorTotal = 0;
      if (objeto.plano === 'Mensal') {
        valorTotal = objeto.valor_aula;
      } else {
        valorTotal = objeto.aulas_feitas * objeto.valor_aula;
      }

      const {
        nome, celular, aulas_feitas, data_vencimento, plano, id_personal,
      } = objeto;
      return {
        nome, celular, aulas_feitas, data_vencimento, valorTotal, plano, id_personal,
      };
    });

    const resultFinal = await Promise.all(result.map(async (objeto) => {
      const [result2] = await PersonalRepository.listPersonaisById(objeto.id_personal);

      const nomeDoPersonal = result2.nome;
      return { ...objeto, nomeDoPersonal };
    }));

    response.json(resultFinal);
  }

  async filtroPorMesAlunos(request, response) {
    const { id } = request.params;

    const result = await LancamentoRepository.JoinLancamentoPersonal(id);

    response.json(result);
  }

  async autorizarCobranca(request, response) {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 3);
    const dataParaCobrar = moment(date).format('YYYY-MM-DD');

    const alunos = await AlunoRepository.cobranca(dataParaCobrar);
    const alunosPorQuantidade = await AlunoRepository.cobrancaQuantidade();

    const todasDividas = [...alunos, ...alunosPorQuantidade];

    const listaAlunos = await Promise.all(todasDividas.map(async (aluno) => {
      const {
        id_aluno, id_personal, nome, data_vencimento, valor_aula, plano, aulas_feitas, aulas_pacote,
      } = aluno;
      const [result] = await PersonalRepository.listPersonaisById(id_personal);

      const nomeDoPersonal = result.nome;
      const dataVencimento = moment(data_vencimento).format('YYYY-MM-DD');
      return {
        id_aluno,
        id_personal,
        nome,
        nomeDoPersonal,
        data_vencimento: dataVencimento,
        valor_aula,
        aulas_feitas,
        aulas_pacote,
        plano,
      };
    }));

    response.json(listaAlunos);
  }

  async alunoTodos(request, response) {
    const result = await AlunoRepository.alunosTodos();

    response.json(result);
  }

  async comprovantes(request, response) {
    const alunosPagos = await AlunoRepository.comprovantes();

    const infoDePagamento = await Promise.all(alunosPagos.map(async (objeto) => {
      const { nome, celular, id_personal } = objeto;
      const [resultado] = await PersonalRepository.listPersonaisById(id_personal);
      const nomeDoPersonal = resultado.nome;
      return { nomeDoPersonal, nome, celular };
    }));

    response.json(infoDePagamento);
  }

  async desligarAluno(request, response) {
    const { id } = request.params;

    await AlunoRepository.desligarAluno(id);

    response.sendStatus(204);
  }

  async enviarCobranca(request, response) {
    const { // id_personal
      id_personal,
      id_aluno,
      gatilho,
      plano,
      nome,
      personalNome,
    } = request.body;
    const { pix } = await PersonalRepository.listPersonaisById(id_personal);
    const { celular } = await AlunoRepository.listByAlunoId(id_aluno);

    let dados = 0;
    if (plano === 'Diario') {
      const { aulas_pacote, aulas_feitas, valor_aula } = request.body;
      dados = {
        gatilho,
        plano,
        nome: nome.split(' ')[0],
        personalNome,
        pix,
        celular,
        aulasDisponiveis: aulas_pacote - aulas_feitas,
        totalPagar: aulas_feitas * aulas_pacote,
        valor_aula,
      };
    } else {
      const { data_vencimento, valor_aula } = request.body;
      const dataVencimento = moment(data_vencimento).local().format('DD/MM/YYYY');
      dados = {
        gatilho,
        plano,
        nome: nome.split(' ')[0],
        personalNome,
        pix,
        celular,
        data_vencimento: dataVencimento,
        totalPagar: valor_aula,

      };
    }
    BotController.enviaMenssagem(dados);
    response.status(200).send();
  }
}

module.exports = new AlunoController();
