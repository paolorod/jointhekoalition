'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Express and Handlebars setup
const express = require('express');

// locale configuration for browser negotiation library
// used to make the first redirect automatically
const locale = require("locale");
const languages = {
  supported: ["en", "fr", "it"],
  default: "it"
};

// Helpers and Handlerbars configuration
const exphbs  = require('express-handlebars');
const helpers = require('./helpers.js');
const hbs = exphbs.create(
    { defaultLayout: "main",
      helpers: {
        format: helpers.format
      }
    });

// App creation and configuration
const app = express();
app.engine('handlebars', hbs.engine);
app.use(locale(languages.supported, languages.default))
app.set('view engine', 'handlebars');

// static file serving
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// A very basic translation support
var translation = {
  "it" : require("./translations/italian.json"),
  "fr" : require("./translations/french.json"),
  "en" : require("./translations/english.json"),
  default : require("./translations/italian.json")
}

var api_keys = require("./api_keys.json");

// configure Airtable backend
var Airtable = require('airtable');
Airtable.configure({ apiKey: api_keys.airtable })
var base = Airtable.base('appqWQ24V5Xv0VZiH')

// merge two javascript objects
function merge(object1, object2) {
  return Object.assign(object1,object2);
}

// Methods
app.get('/', function (req, res) {
  res.redirect("/"+req.locale)
});

app.get('/:lang/', function (req, res) {
  res.render('home',translation[req.params.lang]);
});

app.get('/:lang/confirmation', function (req, res) {
  res.render('confirm',translation[req.params.lang]);
});


// Start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);