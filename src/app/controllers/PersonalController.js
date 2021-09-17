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

    console.log(cpf);
    console.log(personalData);
    const result = await PersonalRepository.registerPersonal(personalData);
    response.json(result);
  }

  async listPersonais(request, response) {
    const result = await PersonalRepository.listPersonais();
    response.json(result);
  }

  async dadosDoPersonalResumido(request, response) {
    const { bool, id_personais } = request.body;
    const [alunosDevendo] = await AlunoRepository.countPagamentoByPersonalId(bool);
    const quantidadeAlunosDevendo = Object.values(alunosDevendo)[0];

    const [alunos] = await AlunoRepository.countAlunosByPersonalId(id_personais);
    const quantidadeAlunos = Object.values(alunos)[0];

    const [dicionarioFaturamento] = await LancamentoRepository.faturamentoAula(id_personais);
    const faturamentoAula = Object.values(dicionarioFaturamento)[0];

    const [dicionarioFaturamentoExtra] = await LancamentoRepository.faturamentoExtra(id_personais);
    const faturamentoExtra = Object.values(dicionarioFaturamentoExtra)[0];

    const faturamento = faturamentoAula + faturamentoExtra;

    const [{ id_personal, nome }] = await PersonalRepository.listPersonaisById(id_personais);

    response.json({
      id_personal,
      nome,
      quantidadeAlunosDevendo,
      quantidadeAlunos,
      faturamento,
    });
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
}

module.exports = new PersonalController();
