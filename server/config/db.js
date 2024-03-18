const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2");

// create db connection

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// db connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

module.exports = db;
