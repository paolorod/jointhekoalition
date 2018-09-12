'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Express and Handlebars setup
const express = require('express');
const bodyParser = require('body-parser');

// locale configuration for browser negotiation library
// used to make the first redirect automatically
const locale = require("locale");
const languages = {
  supported: ["en", "fr", "it"],
  default: "it"
};

// A very basic translation support
var translation = {
  languages : languages,
  translations : {
    "it" : require("./translations/italian.json"),
    "fr" : require("./translations/french.json"),
    "en" : require("./translations/english.json"),
  },
  
  get: function(lang) {
    if(this.languages.supported.includes(lang)) {
      return this.translations[lang];
    } else {
      console.log("Language "+lang+" not found - using default")
      return this.translations[this.languages.default];
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

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// load secrets config files
var secrets = require("./secrets.json");
app.set("secrets",secrets);

// configure Airtable backend
var Airtable = require('airtable');
Airtable.configure({ apiKey: secrets.api_keys.airtable })
var base = Airtable.base('appgY2DrHNOEPfIGJ')
app.set("base",base)

// configure mailer backed
var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport(
  {
    host: 'ssl0.ovh.net',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: secrets.email.username,
        pass: secrets.email.password
    }}
);
app.set("mailer-transport",transport);

// controllers
const confirmation_controller = require("./controllers/confirmation_controller")


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