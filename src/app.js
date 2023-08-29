const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req.body)
    res.sendFile('index.html', { root : 'public' })
});


module.exports = app;