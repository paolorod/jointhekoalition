'use strict';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// Express and Handlebars setup
const express = require('express');
const exphbs  = require('express-handlebars');
const hbs = exphbs.create({ defaultLayout: "main"});


// App creation and configuration
const app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// static file serving
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));

// A very basic translation support
var translation = {
  "ita" : require("./translations/italian.json"),
  "fra" : require("./translations/french.json"),
  "eng" : require("./translations/english.json"),
  default : require("./translations/italian.json")
}


// Methods
app.get('/', function (req, res) {
  res.redirect("/ita")
});

app.get('/:lang/', function (req, res) {
  res.render('home',translation[req.params.lang]);
});


// Start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);