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
}

module.exports = new AlunoRepository();
