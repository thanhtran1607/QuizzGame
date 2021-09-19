const express = require('express');
const Handlebars = require('express-Handlebars');
const path = require('path');
const db = require('./config/db/index');
const routerAuth = require('./routers/auth');
const routerQuizt = require('./routers/Quizt');
const loginregister = require('./routers/getindex');
const Highscore = require('./routers/highScores');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express();
const port = 3000;
db.connect();
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.engine('hbs', Handlebars({extname: '.hbs'}) );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));
app.use(
    express.urlencoded({
      extended: true
    })
  );
app.use(express.json());
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Headers","*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

  next();
});



app.use('/',routerAuth);
app.use('/',routerQuizt);
app.use('/',loginregister);
app.use('/',Highscore);


app.listen(port, () => console.log(`Sever is running on ${port}`));