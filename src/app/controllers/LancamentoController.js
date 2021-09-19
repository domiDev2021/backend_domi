const LancamentoRepository = require('../repository/LancamentoRepository');

class LancamentoController {
  async lancaAula(request, response) {
    const {
      id_personal, id_aluno, data_inicial, data_final, quantidade,
    } = request.body;

    const result = await LancamentoRepository.lancaAula({
      id_personal, id_aluno, data_inicial, data_final, quantidade,
    });

    response.json(result);
  }

  async lancaPagamento(request, response) {
    const {
      id_personal, id_aluno, quantidade, valor, data,
    } = request.body;

    const result = await LancamentoRepository.lancaPagamento({
      id_personal, id_aluno, quantidade, valor, data,
    });

    response.json(result);
  }

  async lancaRendaExtra(request, response) {
    const {
      id_personal, valor, descricao, data,
    } = request.body;

    const result = await LancamentoRepository.lancaRendaExtra({
      id_personal, valor, descricao, data,
    });

    response.json(result);
  }
}

module.exports = new LancamentoController();