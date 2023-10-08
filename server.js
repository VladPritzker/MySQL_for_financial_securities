const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();

app.use(cors());

app.use(express.json());






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


  


// Update onrise or investedAmount for an investor
// Update onrise or investedAmount for an investor
app.put('/api/investors/customId/:customId', (req, res) => {
  const { customId } = req.params; // Get the customId from the URL params
  const { onrise, investedAmount } = req.body; // Get the new values from the request body

  // Determine which column to update based on the presence of 'onrise' or 'investedAmount' in the request body
  let updateColumn;
  let updateValue;
  if (onrise !== undefined && onrise !== null) {
    updateColumn = 'onrise';
    updateValue = onrise;
  } else if (investedAmount !== undefined && investedAmount !== null) { // Update 'investedAmount' here
    updateColumn = 'investedAmount';
    updateValue = investedAmount;
  } else {
    res.status(400).json({ error: 'Invalid request. Missing update data.' });
    return;
  }
  
  // Check if an investor with the given customId exists
  db.query(
    'SELECT * FROM investors WHERE customId = ?',
    [customId],
    (err, results) => {
      if (err) {
        console.error('Error checking customId existence:', err);
        res.status(500).json({ error: 'Server error' });
        return;
      }

      if (results.length === 0) {
        // If investor not found, return 404 Not Found
        res.status(404).json({ error: 'Investor not found' });
        return;
      }

      // Execute an SQL query to update the specified column for the investor by customId
      db.query(
        `UPDATE investors SET ${updateColumn} = ? WHERE customId = ?;`,
        [updateValue, customId],
        (err, updateResults) => {
          if (err) {
            console.error('Error updating database:', err);
            res.status(500).json({ error: 'Server error' });
            return;
          }

          // If updated successfully, send a response with success
          res.json({ success: true });
        }
      );
    }
  );
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
  