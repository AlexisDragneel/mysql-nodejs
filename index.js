// express
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());

// my sql
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'alexis',
  password: 'Blink-182',
  database: 'DianaTest',
  multipleStatements: true,
  port: '1434'
});

connection.connect(err => {
  if (err) {
    console.error(
      'Connection Failed! ' + JSON.stringify(err.stack, undefined, 2)
    );

    return;
  }
  console.log('Connection Established Successsfully');
});

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listenign on port ${port}`));

app.get('/students', (req, res) => {
  connection.query('SELECT * FROM Students', (err, rows, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    res.send(rows);
  });
});

app.post('/students', (req, res) => {
  const student = req.body;
  const sql_query = `INSERT INTO Studenst ([Name], [Grade]) VALUES (?, ?)`;
  connection.query(
    sql_query,
    [student.name, student.grade],
    (err, rows, fields) => {
      if (err) {
        console.error(err.stack);
        return;
      }

      res.send(rows);
    }
  );
});
