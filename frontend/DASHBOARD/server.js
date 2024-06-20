const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; // Replace with your desired port number

// MySQL Database Connection
const connection = mysql.createConnection({
  host: 'localhost',     // Change to your MySQL host
  user: 'root',          // Change to your MySQL username
  password: '',          // Change to your MySQL password
  database: 'waste-management' // Change to your MySQL database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing) Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Route to handle POST request to create a schedule
app.post('/api/schedules', (req, res) => {
  const { user_id, schedule_date, collection_type, enable_notification } = req.body;

  // Insert into MySQL database
  const queryString = 'INSERT INTO schedule (user_id, schedule_date, collection_type, enable_notification) VALUES (?, ?, ?, ?)';
  connection.query(queryString, [user_id, schedule_date, collection_type, enable_notification], (err, results, fields) => {
    if (err) {
      console.error('Error inserting schedule:', err);
      res.status(500).json({ error: 'Error scheduling collection. Please try again.' });
      return;
    }
    console.log('Schedule created:', results);
    res.status(201).json({ message: 'Schedule created successfully', schedule: req.body });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
