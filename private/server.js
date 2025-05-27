require('dotenv').config({ path: './private/.env' });
const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());

// Enable CORS for all routes
server.use(cors());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Test DB connection
db.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database.');
  }
});

// Test server connection
server.listen(process.env.PORT, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log(`Server is running on port ${process.env.PORT}`);
  }
});

// Courses route
server.get('/courses', (req, res) => {
  selectAll('Courses')(req, res);
});

function selectAll(tableName) {
  return (req, res) => {
    db.query(`SELECT * FROM ${tableName}`, (error, results) => {
      if (error) {
        console.error(`GET from "${tableName}" failed:`, error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  };
}

function selectColumn(tableName, columnName) {
    return (req, res) => {
        const value = req.params[columnName];
        db.query(`SELECT * FROM ${tableName} WHERE ${columnName} = ?`, [value], (error, results) => {
        if (error) {
            console.error(`GET from "${tableName}" failed:`, error);
            res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: `${tableName.slice(0, -1)} not found` });
        } else {
            res.json(results);
        }
        });
    };
}

// Users route
server.get('/users', (req, res) => {
    selectAll('users')(req, res);
});

// Products route
server.get('/products', (req, res) => {
    selectAll('products')(req, res);
});

