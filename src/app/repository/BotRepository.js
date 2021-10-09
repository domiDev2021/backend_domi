const db = require('../../database');

class BotRepository {
  getPersonalDataByPhone(phone) {
    const query = `
    SELECT personais.nome as PersonalNome, personais.pix, alunos.*
    FROM personais
    LEFT JOIN alunos ON domibase.alunos.celular = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(query, phone, (erro, resultado) => {
        if (erro) {
          return reject(erro);
        }
        return resolve(resultado);
      });
    });
  }
}

module.exports = new BotRepository();
