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
    const query = 'SELECT * FROM alunos WHERE ativo = 1';
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
    const query = 'SELECT nome, plano, valor_aula, aulas_feitas, aulas_pacote, data_vencimento, status_pagamento FROM alunos WHERE ativo = 1';
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
    status_pagamento = ?,
    data_vencimento = ?
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
    const query = 'SELECT * FROM alunos WHERE id_personal = ? AND ativo = 1';
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

  countAulasByPersonalId(id) {
    const query = 'SELECT sum(aulas_feitas) FROM alunos WHERE id_personal = ?';
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
    const query = 'SELECT * FROM alunos WHERE status_pagamento = 0 AND ativo = 1';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listAlunosDevendoById(id) {
    const query = 'SELECT * FROM alunos WHERE status_pagamento = 0 and id_personal = ? and ativo = 1';
    return new Promise((resolve, reject) => {
      db.query(query, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listTelefoneByStatusPagamento() {
    const query = 'SELECT * FROM alunos WHERE status_pagamento = 0 and ativo = 1';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  alunosTodos() {
    const query = 'SELECT id_aluno, nome FROM alunos WHERE ativo = 1';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  updateAulasAluno(aula) {
    const query = 'UPDATE alunos SET aulas_feitas = aulas_feitas + ? WHERE id_aluno = ?';
    return new Promise((resolve, reject) => {
      db.query(query, aula, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  comprovantes() {
    const query = 'SELECT * FROM alunos WHERE comprovante = 0 and ativo = 1';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  cobranca(data) {
    const query = 'SELECT * FROM alunos WHERE data_vencimento < ? and ativo = 1';
    return new Promise((resolve, reject) => {
      db.query(query, data, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  updateDataVencimento(dados) {
    const query = 'UPDATE alunos SET data_vencimento = ?, status_pagamento = 0, aulas_feitas = 0 WHERE id_aluno = ?';
    return new Promise((resolve, reject) => {
      db.query(query, dados, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  desligarAluno(id) {
    const query = 'UPDATE alunos SET ativo = 0 WHERE id_aluno = ?';
    return new Promise((resolve, reject) => {
      db.query(query, id, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }
}

module.exports = new AlunoRepository();
