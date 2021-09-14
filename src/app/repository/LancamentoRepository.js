const db = require('../../database/index');

class LancamentoRepostiroy {
  lancaAula(dadosAula) {
    const query = 'INSERT INTO lancamentos_aulas SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, dadosAula, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  lancaPagamento(dadosPagamento) {
    const query = 'INSERT INTO pagamentos_aulas SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, dadosPagamento, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  lancaRendaExtra(dadosRendaExtra) {
    const query = 'INSERT INTO pagamentos_extras SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, dadosRendaExtra, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }
}

module.exports = new LancamentoRepostiroy();
