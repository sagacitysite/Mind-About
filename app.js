// url: http://alexehrnschwender.com/2013/07/client-side-auth-session-mgmt-backbone-node/
/**
 * Module dependencies.
 */

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var http = require('http');
var cookieParser = require('cookie-parser');
//var cookieSession = require('cookie-session');

var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://'+process.env.IP+'/mindabout');
var path = require('path');
var app = express();

// import routes
var users = require('./routes/users');
var topics = require('./routes/topics');
var groups = require('./routes/groups');
var proposals = require('./routes/proposals');
var tests = require('./routes/tests');
var auth = users.auth_wrapper;

// all environments
app.set('port', process.env.PORT || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon('public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser('secret'));
//app.use(cookieSession('secret'));
app.use(session({ secret: 'secret', key: 'uid', cookie: { secure: true }}));
app.use(express.static(path.join(__dirname, 'public')));

// ###################
// ### T O P I C S ###
// ###################

app.get('/json/topics', function(req, res) { auth(req, res, topics.list); });
app.put('/json/topic/:id', function(req, res) { auth(req, res, topics.update); });
app.get('/json/topic/:id', function(req, res) { auth(req, res, topics.query); });
app.post('/json/topic', function(req, res) { auth(req, res, topics.create); });
app.delete('/json/topic/:id', function(req, res) { auth(req, res, topics.delete); });
app.post('/json/topic-vote', function(req, res) { auth(req, res, topics.vote); });
app.post('/json/topic-unvote', function(req, res) { auth(req, res, topics.unvote); });
app.post('/json/topic-join', function(req, res) { auth(req, res, topics.join); });
app.post('/json/topic-unjoin', function(req, res) { auth(req, res, topics.unjoin); });

// #########################
// ### P R O P O S A L S ###
// #########################

app.get('/json/proposal/:id', function(req, res) { auth(req, res, proposals.query); });

// ###################
// ### G R O U P S ###
// ###################

app.get('/json/groups', function(req, res) { auth(req, res, groups.list); });
// get group by id
app.get('/json/group/:id', function(req, res) { auth(req, res, proposals.query); });

// ###################
// ###   A U T H   ###
// ###################

// authentification
// TODO required?
app.get("/json/auth", users.auth );
// POST /api/auth/login
// @desc: logs in a user
app.post("/json/auth/login", users.login );
// creates a user
app.post("/json/auth/signup", users.signup );
// POST /api/auth/logout
// @desc: logs out a user, clearing the signed cookies
app.post("/api/auth/logout", users.logout );
/*// POST /api/auth/remove_account
// @desc: deletes a user
app.post("/api/auth/remove_account", users.delete );*/

// ###################
// ###   T E S T   ###
// ###################

app.get('/test/fill_topic_participants', tests.fill_topic_participants );
app.get('/test/create_groups', tests.create_groups );

// ###################
// ### S E R V E R ###
// ###################

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
