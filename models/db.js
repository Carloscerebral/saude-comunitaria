const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Beatriz1.', 
  database: 'saude'
});

module.exports = pool.promise();
