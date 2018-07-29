'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const hbs = exphbs.create({ /* config */ });

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const VIEWS = __dirname + '/views'

// App
const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));


app.get('/', function (req, res) {
  res.render('home');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);