var mysql = require('mysql');
require('dotenv').config();

var pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASS,
  database: process.env.DATABASE
});

module.exports.pool = pool;