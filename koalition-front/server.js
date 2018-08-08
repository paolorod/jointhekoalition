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
app.use('/fonts', express.static(__dirname + '/fonts'));

// A very basic translation support
var translation = {
  "ita" : require("./translations/italian.json"),
  "fra" : require("./translations/french.json"),
  "eng" : require("./translations/english.json"),
  default : require("./translations/italian.json")
}

var api_keys = require("./api_keys.json");

// merge two javascript objects
function merge(object1, object2) {
  return Object.assign(object1,object2);
}

// Methods
// @TODO add correct translation selection logic
app.get('/', function (req, res) {
  res.redirect("/ita")
});

app.get('/:lang/', function (req, res) {
  res.render('home',merge(translation[req.params.lang],api_keys));
});

app.get('/:lang/confirmation', function (req, res) {
  res.render('confirm',merge(translation[req.params.lang],api_keys));
});


// Start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);