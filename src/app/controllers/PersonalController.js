const PersonalRepository = require('../repository/PersonalRepository');
const AlunoRepository = require('../repository/AlunoRepository');
const LancamentoRepository = require('../repository/LancamentoRepository');
const { alunoTodos } = require('./AlunoController');

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
    const alunosDevendo = await AlunoRepository.listAlunosDevendo();

    const personais = new Object();
    const infoAlunosDevendo = await Promise.all(alunosDevendo.map(async (objeto) => {
      const [alunosDevendoByPersonalId] = await AlunoRepository.contaNumeroDeAlunosDevendoByPersonalId(
        objeto.id_personal,
      );
      const numeroDeAlunosDevendoByPersonalId = Object.values(alunosDevendoByPersonalId)[0];

      const [quantidadeAlunosByPersonalId] = await AlunoRepository.countAlunosByPersonalId(
        objeto.id_personal,
      );
      const numeroTotalDeAlunosByPersonalId = Object.values(quantidadeAlunosByPersonalId)[0];

      const [dicionarioFaturamento] = await LancamentoRepository.faturamentoAula(
        objeto.id_personal,
      );
      const faturamentoAula = Object.values(dicionarioFaturamento)[0];

      const [dicionarioFaturamentoExtra] = await LancamentoRepository.faturamentoExtra(
        objeto.id_personal,
      );
      const faturamentoExtra = Object.values(dicionarioFaturamentoExtra)[0];

      const faturamento = faturamentoAula + faturamentoExtra;

      const [personalDados] = await PersonalRepository.listPersonaisById(objeto.id_personal);

      const nomePersonal = personalDados.nome;
      const personalId = objeto.id_personal;

      if (!(nomePersonal in Object.keys(personais))) {
        personais[`${nomePersonal}`] = {
          nomePersonal,
          personalId,
          numeroDeAlunosDevendoByPersonalId,
          numeroTotalDeAlunosByPersonalId,
          faturamento,
        };
        return personais;
      }
    }));

    response.json(Object.values(personais));
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
