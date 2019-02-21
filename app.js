// We’ll declare all our dependencies here
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

// [SH] Bring in the data model
require('./server/models');

require('./config/passport');
// Connect mongoose to our database

//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cookieParser());
app.use(cors());

//Middleware for bodyparsing using both json and urlencoding
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: "250mb", extended: true }));
app.use(bodyParser.json({ limit: "250mb" }));

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

require("./routers")(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Setup a default catch-all route that sends back a welcome message in JSON format.

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to Node API',
}));

module.exports = app;