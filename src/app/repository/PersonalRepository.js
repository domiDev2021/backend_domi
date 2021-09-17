const db = require('../../database/index');

class PersonalRepository {
  registerPersonal(personalData) {
    const query = 'INSERT INTO personais SET ?';
    return new Promise((resolve, reject) => {
      db.query(query, personalData, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listPersonais() {
    const query = 'SELECT * FROM personais';
    return new Promise((resolve, reject) => {
      db.query(query, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }

  listPersonaisById(id) {
    const query = 'SELECT * FROM personais WHERE id_personal = ?';
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

module.exports = new PersonalRepository();
