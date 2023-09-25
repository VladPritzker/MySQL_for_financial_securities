// db.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // адрес сервера MySQL
  user: 'pritzker', // имя пользователя
  password: 'Test11!!', // пароль пользователя
  database: 'myproject' // имя вашей базы данных
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных MySQL');
  }
});

module.exports = connection;
