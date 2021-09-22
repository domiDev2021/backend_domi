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
    const lista = await AlunoRepository.listTelefoneByStatusPagamento();

    const result = lista.map((objeto) => {
      const valorTotal = objeto.aulas_feitas * objeto.valor_aula;
      const {
        nome, celular, aulas_feitas, data_vencimento, plano, id_personal,
      } = objeto;
      return {
        nome, celular, aulas_feitas, data_vencimento, valorTotal, plano, id_personal,
      };
    });

    const resultFinal = await Promise.all(result.map(async (objeto) => {
      const [result2] = await PersonalRepository.personalTodos(objeto.id_personal);
      console.log(result2);
      const nomeDoPersonal = result2.nome;
      return { ...objeto, nomeDoPersonal };
    }));
    console.log(resultFinal);
    response.json(resultFinal);
  }

  async filtroPorMesAlunos(request, response) {
    const { id } = request.params;
    const results = await LancamentoRepository.JoinLancamentoPersonal(id);
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

  async autorizarCobranca(request, response) {
    const { dia } = request.params;

    const result = await AlunoRepository.listAlunos();

    const day = new Date();
    day.setDate(dia);
    const day1 = new Date(day);
    const day2 = new Date(day);
    const day3 = new Date(day);

    day1.setDate(day1.getDate());
    day2.setDate(day2.getDate() - 1);
    day3.setDate(day3.getDate() - 2);

    const filtroData = [day3, day2, day1];
    const diaCriado1 = filtroData[0].getDate();
    const mesCriado1 = filtroData[0].getMonth();
    const anoCriado1 = filtroData[0].getFullYear();
    const diaCriado2 = filtroData[1].getDate();
    const mesCriado2 = filtroData[1].getMonth();
    const anoCriado2 = filtroData[1].getFullYear();
    const diaCriado3 = filtroData[2].getDate();
    const mesCriado3 = filtroData[2].getMonth();
    const anoCriado3 = filtroData[2].getFullYear();
    const lista = [];
    const filtrado = result.map((value) => {
      const diaBanco = value.data_vencimento.getDate();
      const mesBanco = value.data_vencimento.getMonth() + 1;
      const anoBanco = value.data_vencimento.getFullYear();

      const dataBanco = `${anoBanco}-${mesBanco}-${diaBanco}`;
      const dia1 = `${anoCriado1}-${mesCriado1}-${diaCriado1}`;
      const dia2 = `${anoCriado2}-${mesCriado2}-${diaCriado2}`;
      const dia3 = `${anoCriado3}-${mesCriado3}-${diaCriado3}`;

      if (dataBanco === dia1 || dataBanco === dia2 || dataBanco === dia3) {
        const {
          id_aluno, id_personal, nome, plano, aulas_feitas, valor_aula,
        } = value;

        lista.push({
          id_aluno, id_personal, nome, plano, aulas_feitas, valor_aula,
        });
      }

      return lista;
    });
    const listaFinal = [];
    const final = await Promise.all(filtrado[0].map(async (objeto) => {
      const [resultado] = await PersonalRepository.listPersonaisById(objeto.id_personal);
      const nomePersonal = resultado.nome;
      const objetoCompleto = { ...objeto, nomePersonal };
      listaFinal.push(objetoCompleto);

      return listaFinal;
    }));

    response.json(listaFinal);
  }

  async alunoTodos(request, response) {
    const result = await AlunoRepository.alunosTodos();

    response.json(result);
  }
}

module.exports = new AlunoController();
