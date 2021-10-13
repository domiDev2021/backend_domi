const PersonalRepository = require('../repository/PersonalRepository');
const AlunoRepository = require('../repository/AlunoRepository');
const LancamentoRepository = require('../repository/LancamentoRepository');

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

    const result = await PersonalRepository.registerPersonal(personalData);
    response.json(result);
  }

  async listPersonais(request, response) {
    const result = await PersonalRepository.listPersonais();
    response.json(result);
  }

  async dadosDoPersonalResumido(request, response) {
    const { id } = request.params;

    const [{
      nome, email, telefone, cpf, agencia, conta, codigo_banco, pix,
    }] = await PersonalRepository.listPersonaisById(id);
    const [alunosAtrasado] = await AlunoRepository.contaNumeroDeAlunosDevendoByPersonalId(id);
    const numeroDeAlunosAtrasados = alunosAtrasado['COUNT(*)'];

    const todosAlunos = await AlunoRepository.listByPersonalId(id);

    let faturamentoTotal = 0;
    todosAlunos.forEach((aluno) => {
      const { aulas_pacote, valor_aula, aulas_feitas } = aluno;
      if (aulas_pacote === 0) {
        faturamentoTotal += valor_aula;
      } else {
        faturamentoTotal += valor_aula * aulas_feitas;
      }
    });

    let numeroDeAulasDoMesFeitas = 0;
    const mes = new Date().getMonth();
    const lancamentosAulas = await LancamentoRepository.listaLancamentoDeAulasByPersonalId(id);

    lancamentosAulas.forEach((lancamento) => {
      const { data_inicial, quantidade } = lancamento;
      let mesLancado = new Date(data_inicial).getMonth();
      if (mesLancado = mes) {
        numeroDeAulasDoMesFeitas += quantidade;
      }
    });

    const objetoFinal = {
      nome,
      email,
      telefone,
      cpf,
      agencia,
      conta,
      codigo_banco,
      pix,
      numeroDeAlunosAtrasados,
      faturamentoTotal,
      numeroDeAulasDoMesFeitas,
    };
    response.json(objetoFinal);
  }

  async dadosDoPersonalResumidoGeral(request, response) {
    // nomeDeCadaPersonal,
    // quantidadeDeAlunos atrasados,
    // numero de alunos total
    // faturamento
    const personais = await PersonalRepository.listPersonais();
    const listaFinal = await Promise.all(personais.map(async (personal) => {
      const { nome, id_personal } = personal;
      const [alunosAtrasado] = await AlunoRepository.contaNumeroDeAlunosDevendoByPersonalId(
        id_personal,
      );
      const numeroDeAlunosAtrasados = alunosAtrasado['COUNT(*)'];

      const [alunosTotal] = await AlunoRepository.countAlunosByPersonalId(id_personal);
      const numeroTotalDeAlunos = alunosTotal['COUNT(*)'];

      const todosAlunos = await AlunoRepository.listByPersonalId(id_personal);

      let faturamentoTotal = 0;
      todosAlunos.forEach((aluno) => {
        const { aulas_pacote, valor_aula, aulas_feitas } = aluno;
        if (aulas_pacote === 0) {
          faturamentoTotal += valor_aula;
        } else {
          faturamentoTotal += valor_aula * aulas_feitas;
        }
      });

      const objeto = {
        nome,
        numeroDeAlunosAtrasados,
        numeroTotalDeAlunos,
        faturamentoTotal,
      };

      return objeto;
    }));

    response.json(listaFinal);
  }

  async listPersonalById(request, response) {
    const { id } = request.params;
    const [{
      nome, email, telefone, agencia, conta, codigo_banco, cpf, pix,
    }] = await PersonalRepository.listPersonaisById(id);

    response.json({
      nome, email, telefone, agencia, conta, codigo_banco, cpf, pix,
    });
  }

  async filtroMesFinanceiroPersonal(request, response) {
    const { id } = request.params;

    const [aulasFaturamentoAula] = await LancamentoRepository.faturamentoAula(id);
    const [outrasReceitasExtra] = await LancamentoRepository.faturamentoExtra(id);

    const results = await LancamentoRepository.JoinLancamentoPersonal(id);
    const chavesPermitidas = ['id_personal', 'valor_aula', 'quantidade'];

    const resultFiltrado = results.map((result) => {
      const keys = Object.keys(result);
      const chavesFiltradas = keys.filter((key) => chavesPermitidas.includes(key));
      const listReduce = chavesFiltradas.reduce((objeto, chave) => {
        objeto[chave] = result[chave];
        return objeto;
      }, {});
      return listReduce;
    });

    let aulasReceber = 0;
    const x = resultFiltrado.map((objeto) => {
      aulasReceber += (objeto.quantidade * objeto.valor_aula);

      return aulasReceber;
    });

    const aulasPagas = aulasFaturamentoAula['SUM(valor)'];
    const outrasReceitas = outrasReceitasExtra['SUM(valor)'];
    const entrega = { aulasPagas, outrasReceitas, aulasReceber };

    response.json(entrega);
  }

  async PersonalTodos(request, response) {
    const result = await PersonalRepository.personalTodos();
    response.json(result);
  }
}

module.exports = new PersonalController();
