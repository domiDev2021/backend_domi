const db = require('../../database');

class PersonalRepository {
  // create personal
  async createPersonal({
    nome, email, telefone, cpf, agencia, conta, codigo_banco, pix,
  }) {
    const [row] = await db.query(`
    INSERT INTO personais(nome, email, telefone, cpf, agencia, conta, codigo_banco, pix)
    VALUES (?,?,?,?,?,?,?,?)
    RETURNING *
    `, [nome, email, telefone, cpf, agencia, conta, codigo_banco, pix]);

    return row;
  }

  // list all registers
  async findAll() {
    const rows = await db.query(`
    SELECT * FROM personais
    `);

    return rows;
  }
}

module.exports = new PersonalRepository();
