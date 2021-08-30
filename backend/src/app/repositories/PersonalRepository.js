const connection = require('../../database/index');

class PersonalRepository {
  findAll(res) {
    const sql = 'SELECT * FROM personais';

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(200).json(result);
    });
  }

  createPersonal(req, res) {
    const {
      nome, email, telefone, cpf, agencia, conta, codigo_banco, pix,
    } = req.body;

    const sql = 'INSERT INTO personais SET ?';

    connection.query(sql, {
      nome, email, telefone, cpf, agencia, conta, codigo_banco, pix,
    }, (error, result) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(200).json(result);
    });
  }
}

module.exports = new PersonalRepository();
