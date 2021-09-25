const AlunoRepository = require('../repository/AlunoRepository');
const LancamentoRepository = require('../repository/LancamentoRepository');

class LancamentoController {
  async lancaAula(request, response) {
    const {
      id_personal, id_aluno, data_inicial, data_final, quantidade,
    } = request.body;

    const result = await LancamentoRepository.lancaAula({
      id_personal, id_aluno, data_inicial, data_final, quantidade,
    });

    const atualizaAulaAluno = await AlunoRepository.updateAulasAluno([quantidade, id_aluno]);

    response.json(result);
  }

  async lancaPagamento(request, response) {
    const {
      id_personal, id_aluno, quantidade, valor,
    } = request.body;

    const result = await LancamentoRepository.lancaPagamento({
      id_personal, id_aluno, quantidade, valor,
    });

    response.json(result);
  }

  async lancaRendaExtra(request, response) {
    const {
      id_personal, valor, descricao, quantidade,
    } = request.body;

    const result = await LancamentoRepository.lancaRendaExtra({
      id_personal, valor, descricao, quantidade,
    });

    response.json(result);
  }
}

module.exports = new LancamentoController();
