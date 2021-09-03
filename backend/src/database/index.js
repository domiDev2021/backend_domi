const { createPool } = require('mysql');
const {
  HOST, USER, DATABASE, PASSWORD,
} = require('./configs');

const connection = new createPool({
  connectionLimit: 10,
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

// connection.connect();

module.exports = connection;
