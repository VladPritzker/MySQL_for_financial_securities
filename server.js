const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Импорт библиотеки CORS
const app = express();

app.use(cors()); // Используйте CORS middleware


// Подключение к базе данных
const db = mysql.createConnection({
  host: 'localhost',
  user: 'vlad',
  password: 'Test11!!',
  database: 'myproject'
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных MySQL');
  }
});

// Обработка запросов API
// Например, создайте маршрут для получения всех инвесторов
app.get('/api/investors', (req, res) => {
  db.query('SELECT * FROM investors', (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
      return;
    }
    res.json(results);
  });
});

app.delete('/api/investors/:id', (req, res) => {
  const { id } = req.params; // Получите идентификатор инвестора из параметров URL

  // Выполните SQL-запрос для удаления инвестора по идентификатору
  db.query('DELETE FROM investors WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Ошибка при удалении инвестора из базы данных:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
      return;
    }

    // Если успешно удалено, отправьте ответ с успехом
    res.json({ success: true });
  });
});

  

// Другие маршруты и обработчики запросов могут быть добавлены здесь

// Запуск сервера на порту 3000
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

app.get('/', (req, res) => {
    res.send('Добро пожаловать на сервер');
  });
  


  app.put('/api/investors/:id', (req, res) => {
    const { id } = req.params; // Получите идентификатор инвестора из параметров URL
    const { onrise } = req.body; // Получите данные для обновления из тела запроса
  
    // Выполните SQL-запрос для обновления состояния onrise инвестора по идентификатору
    db.query('UPDATE investors SET onrise = ? WHERE id = ?', [onrise, id], (err, results) => {
      if (err) {
        console.error('Ошибка при обновлении инвестора в базе данных:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
        return;
      }
  
      // Если успешно обновлено, отправьте ответ с успехом
      res.json({ success: true });
    });
  });
  

  app.post('/api/investors', (req, res) => {
    const newInvestor = req.body; // Получите нового инвестора из тела запроса
  
    // Выполните SQL-запрос для добавления нового инвестора в базу данных
    db.query('INSERT INTO investors (name, lastName, investedAmount, onrise) VALUES (?, ?, ?, ?)', 
      [newInvestor.name, newInvestor.lastName, newInvestor.investedAmount, newInvestor.onrise], 
      (err, results) => {
        if (err) {
          console.error('Ошибка при добавлении нового инвестора в базу данных:', err);
          res.status(500).json({ error: 'Ошибка сервера' });
          return;
        }
  
        // Если успешно добавлено, отправьте ответ с успехом
        res.json({ success: true });
      }
    );
  });
  