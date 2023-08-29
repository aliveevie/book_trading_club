const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root : 'public' })
});


module.exports = app;