/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var login = require('./routes/login');
var expressLayouts = require('express-ejs-layouts');

var app = express();

// all environments
app.set('port', process.env.PORT || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'index')

app.use(expressLayouts);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//f�r die URL '/' wird login.js Funtkion home aufgerufen
app.get('/', login.home);

// display the list of Ehterpads
app.get('/padlist', login.etherpads);

//Handler f�r Daten die �ber Post kommen
app.post('/', login.home_post_handler);
app.post('/padlist', login.etherpads_post_handler);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
