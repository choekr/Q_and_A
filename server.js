var express = require('express');
var app = express();
var path = require('path');
var bp = require('body-parser');
var session = require('express-session');
var port = 8000;

app.use(session({
  secret: 'keboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure:false}
}));
app.use(bp.json());
app.use(express.static(path.join(__dirname + '/client')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
  console.log(`Listening on ${port}`);
})
