const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'wastexpert' // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Create table if it doesn't exist
const createRoutesPerformanceTable = `CREATE TABLE IF NOT EXISTS RoutesPerformance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    performance_date DATE,
    performance_metrics TEXT
)`;

db.query(createRoutesPerformanceTable, (err, result) => {
    if (err) throw err;
    console.log('RoutesPerformance table created or already exists');
});

// API routes
app.post('/api/addPerformance', (req, res) => {
    const { name, description, performance_date, performance_metrics } = req.body;
    const query = 'INSERT INTO RoutesPerformance (name, description, performance_date, performance_metrics) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, performance_date, performance_metrics], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Failed to add performance', error: err });
            return;
        }
        res.status(201).json({ message: 'Performance added successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
