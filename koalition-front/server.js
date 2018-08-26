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

// A very basic translation support
var translation = {
  "it" : require("./translations/italian.json"),
  "fr" : require("./translations/french.json"),
  "en" : require("./translations/english.json"),

  get: function(language) {
    if(language in languages.supported) {
      return this[language];
    } else {
      return this[languages.default];
    }
  }
}

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
app.set("translation",translation)
app.set('view engine', 'handlebars');

// static file serving
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/fonts', express.static(__dirname + '/fonts'));


var api_keys = require("./api_keys.json");

const confirmation_controller = require("./controllers/confirmation_controller")

// configure Airtable backend
var Airtable = require('airtable');
Airtable.configure({ apiKey: api_keys.airtable })
var base = Airtable.base('appgY2DrHNOEPfIGJ')
app.set("base",base)

// Methods
app.get('/', function (req, res) {
  res.redirect("/"+req.locale)
});

app.get('/:lang/', function (req, res) {
  res.render('home',translation.get(req.params.lang));
});

app.get('/:lang/confirmation', confirmation_controller.execute_get);

app.post('/:lang/confirmation', confirmation_controller.execute_post);



// Start
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);