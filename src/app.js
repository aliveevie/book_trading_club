const express = require('express');
const app = express();
const bodyparser = require('body-parser')

app.use(bodyparser);
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile('index.html', { root : 'public' })
});


app.get('/', (req, res) => {
    console.log(req.body)
});

module.exports = app;