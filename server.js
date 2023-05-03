const http = require('http');
var express = require('express');
var ejs = require('ejs');
const bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'));

require('./js/Route.js')(app)
app.listen(3000);