const { createConnection } = require('mysql');
const {
  HOST, USER, DATABASE, PASSWORD,
} = require('./configs');

const connection = createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Banco de dados conectado');
});

exports.query = async (query, values) => {
  const { rows } = await connection.query(query, values);
  return rows;
};
