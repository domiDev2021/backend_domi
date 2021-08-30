const { createPool } = require('mysql');
const {
  HOST, USER, DATABASE, PASSWORD,
} = require('./configs');

const connection = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

// connection.connect();

module.exports = connection;
