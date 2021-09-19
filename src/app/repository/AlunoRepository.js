const db = require('../../database');

class AlunoRepository {
  registerAluno(alunoData) {
    const query = 'INSERT INTO alunos SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, alunoData, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listAlunos() {
    const query = 'SELECT * FROM alunos';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listAlunosTabela() {
    const query = 'SELECT nome, plano, valor_aula, aulas_feitas, aulas_pacote, data_vencimento, status_pagamento FROM alunos';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  deleteAluno(id) {
    const query = 'DELETE FROM alunos WHERE id_aluno = ?';
    return new Promise((resolve, reject) => {
      db.query(query, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  updateAluno(alunoData) {
    const query = `
    UPDATE alunos
    SET id_personal = ?, id_aluno = ?, nome = ?,
    celular = ?,
    plano = ?,
    aulas_feitas = ?,
    aulas_pacote = ?,
    valor_aula = ?,
    status_pagamento = ?
    WHERE id_aluno = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(query, alunoData, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listByPersonalId(id) {
    const query = 'SELECT * FROM alunos WHERE id_personal = ?';
    return new Promise((resolve, reject) => {
      db.query(query, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listByAlunoId(id) {
    const query = 'SELECT * FROM alunos WHERE id_aluno = ?';
    return new Promise((resolve, reject) => {
      db.query(query, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  contaNumeroDeAlunosDevendoByPersonalId(id) {
    const query = 'SELECT COUNT(*) FROM alunos WHERE status_pagamento = 0 AND id_personal = ?';
    return new Promise((resolve, reject) => {
      db.query(query, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  countAlunosByPersonalId(id) {
    const query = 'SELECT COUNT(*) FROM alunos WHERE id_personal = ?';
    return new Promise((resolve, reject) => {
      db.query(query, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listAlunosDevendo() {
    const query = 'SELECT * FROM alunos WHERE status_pagamento = 0';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listTelefoneByStatusPagamento(bool) {
    const query = 'SELECT * FROM alunos WHERE status_pagamento = ?';
    return new Promise((resolve, reject) => {
      db.query(query, bool, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  alunosTodos() {
    const query = 'SELECT id_aluno, nome FROM alunos';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }
}

module.exports = new AlunoRepository();
