// import our dependencies
const express = require("express");
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');


// configure environment variables
dotenv.config();

// create a cconnection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});



console.log(process.env.DB_USERNAME);

// testing connection
app.get('/', (req,res) => {
  res.send('login sucessful');
})

//QUESTION 1
  // Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      } else {
          res.json(results);
      }
  });
});


//QUESTION 2
// Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).send(err);
      } else {
          res.json(results);
      }
  });
});

//QUESTION 3
// Filter patients by first name
app.get('/first_name', (req, res) => {
  const first_name = req.query.firstName;
  console.log({first_name});
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(sql, [first_name], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      } else {
        res.json({results:results});
      }
  });
});

//QUESTION 4
// Retrieve providers by specialty

  // method 1
  app.get('/providers_specialty', (req, res) => {

  const specialty = req.query.specialty;
  console.log({specialty});
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  db.query(sql, [specialty], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      } else {
          res.json({results:results});
      }
  });
});
// in the url type everything plus /providers_specialty?specialty=Surgery


// start and listen to the server 
app.listen(3300, () => {
  console.log('server is running on pot 3300')
})