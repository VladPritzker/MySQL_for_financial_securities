const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Импорт библиотеки CORS
const app = express();

app.use(cors()); // Используйте CORS middleware

app.use(express.json());


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




//                                      TESTTESTTESTTEST







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

app.get('/', (req, res) => {
  res.send('Добро пожаловать на сервер');
});






//                                      TESTTESTTESTTEST











app.get('/api/investors/max-id', (req, res) => {
  // Execute an SQL query to get the maximum ID from your database
  db.query('SELECT MAX(id) AS maxId FROM investors', (err, results) => {
    if (err) {
      console.error('Error fetching maximum ID:', err);
      res.status(500).json({ error: 'Error fetching maximum ID' });
      return;
    }

    // Extract the maximum ID from the query results
    const maxId = results[0].maxId || 0;

    // Send the maximum ID as a JSON response
    res.json({ maxId });
  });
});





//                                      TESTTESTTESTTEST





app.get('/api/investors/customId/:customId', (req, res) => {
  const { customId } = req.params;

  // Выполните SQL-запрос для поиска инвестора по customId
  db.query('SELECT * FROM investors WHERE customId = ?', [customId], (err, results) => {
    if (err) {
      console.error('Ошибка при получении инвестора по customId:', err);
      res.status(500).json({ error: 'Ошибка при получении инвестора по customId' });
      return;
    }

    // Проверьте, существует ли инвестор с указанным customId
    if (results.length === 0) {
      // Если инвестор не найден, верните статус 404 и сообщение об ошибке
      res.status(404).json({ error: 'Инвестор не найден' });
    } else {
      // Если инвестор найден, верните данные инвестора как JSON-ответ
      res.json(results[0]);
    }
  });
});


  




//                                      TESTTESTTESTTEST

app.get('/api/investors/:id', (req, res) => {
  const { id } = req.params; // Получите ID инвестора из параметров URL

  // Выполните SQL-запрос для получения инвестора по ID из вашей базы данных
  db.query('SELECT * FROM investors WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Ошибка при получении инвестора по ID:', err);
      res.status(500).json({ error: 'Ошибка при получении инвестора по ID' });
      return;
    }

    // Проверьте, существует ли инвестор с указанным ID
    if (results.length === 0) {
      // Если инвестор не найден, верните статус 404 и сообщение об ошибке
      res.status(404).json({ error: 'Инвестор не найден' });
    } else {
      // Если инвестор найден, верните данные инвестора как JSON-ответ
      res.json(results[0]);
    }
  });
});

//                                      TESTTESTTESTTEST






const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});


  


app.put('/api/investors/customId/:customId', (req, res) => {
  const { customId } = req.params; // Получите идентификатор инвестора из параметров URL
  const { updateType } = req.body; // Получите updateType из тела запроса
  let columnToUpdate;

  // Определите, какой столбец базы данных обновлять в зависимости от updateType
  if (updateType === 'onrise') {
    columnToUpdate = 'onrise';
  } else if (updateType === 'investedAmount') {
    columnToUpdate = 'investedAmount';
  } else {
    res.status(400).json({ error: 'Недопустимый updateType' });
    return;
  }

  // Получите данные для обновления из тела запроса
  const dataToUpdate = req.body[updateType];

  // Выполните SQL-запрос для обновления соответствующего столбца инвестора по идентификатору
  db.query(`UPDATE investors SET ${columnToUpdate} = ? WHERE customId = ?;`, [dataToUpdate, customId], (err, results) => {
    if (err) {
      console.error('Ошибка при обновлении инвестора в базе данных:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
      return;
    }

    // Если успешно обновлено, отправьте ответ с успехом
    res.json({ success: true });
  });
});








  //                                      TESTTESTTESTTEST




  app.post('/api/investors', (req, res) => {
    const newInvestor = req.body;
  
    db.query(
      'INSERT INTO investors (name, lastName, investedAmount, onrise, customId) VALUES (?, ?, ?, ?, ?)', 
      [newInvestor.name, newInvestor.lastName, newInvestor.investedAmount, newInvestor.onrise, newInvestor.customId], // Добавьте "," здесь
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
  
  
  
  
  //                                      TESTTESTTESTTEST






  app.delete('/api/investors/customId/:customId', (req, res) => {
    const { customId } = req.params; // Получите customId инвестора из параметров URL
  
    // Выполните SQL-запрос для удаления инвестора по customId
    db.query('DELETE FROM investors WHERE customId = ?', [customId], (err, results) => {
      if (err) {
        console.error('Ошибка при удалении инвестора из базы данных:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
        return;
      }
  
      console.log(`Инвестор с customId ${customId} успешно удален.`);
      res.json({ success: true });
    });
  });



///////////CALENDAR/////////////////

  app.get('/api/calendar', (req, res) => {
    db.query('SELECT * FROM calendar', (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Server error' });
        return;
      }
      res.json(results);
    });
  });
  

  
  

  app.get('/api/calendar/:date', (req, res) => {
    const { date } = req.params;

    db.query('SELECT * FROM calendar WHERE date = ?', [date], (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Day not found' });
        } else {
            res.json(results[0]);
        }
    });
});


app.put('/api/calendar/:date', (req, res) => {
  const { date } = req.params;
  const { slept, studied, wokeUp } = req.body;

  // Construct SQL query
  const query = `
    UPDATE calendar
    SET slept = ?, studied = ?, wokeUp = ?
    WHERE date = ?;
  `;

  // Execute SQL query
  db.query(query, [slept, studied, wokeUp, date], (err, result) => {
    if (err) {
      console.error('Error updating calendar:', err);
      res.status(500).json({ error: "Error updating calendar" });
      return;
    }
    res.json({ message: 'Calendar updated successfully' })
  });
});
  ///////////CALENDAR/////////////////