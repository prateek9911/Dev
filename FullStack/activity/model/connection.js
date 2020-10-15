const mysql = require('mysql');
const {user, db_psw, db_name} = require("../config/secrets.json");
const connection = mysql.createConnection({
  host: 'localhost',
  user: user,
  password: db_psw,
  database: db_name
});

connection.connect()

console.log("Connected to DB");

module.exports = connection;
