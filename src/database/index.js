const { createPool } = require('mysql');
require('dotenv').config();

const connection = new createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// connection.connect();

module.exports = connection;
