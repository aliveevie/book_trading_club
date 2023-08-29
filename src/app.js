const express = require('express');
const app = express();
const { Pool } = require('pg');
const dotevn = require('dotenv');
dotevn.config();
const db = require('../Database/database');



// Connect to the PostgreSQL database


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile('index.html', { root : 'public' })
});

app.post('/', async (req, res) => {
    const { name, age, phone } = req.body
    const result = await db.query(
        'INSERT INTO users (name, age, phone) VALUES ($1, $2, $3) RETURNING id',
        [name, age, phone]
      );
  
      res.json({ id: result.rows[0].id, message: 'Result added successfulyy!'})
});

app.put('/', async (req, res) => {
    const table = req.body.table;
   console.log(req.body)
});



module.exports = app;