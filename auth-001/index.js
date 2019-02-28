const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const URL = 'https://kodaktor.ru/j/users';
const fetch = require('node-fetch');
var items;

app.listen(1234, () => {
  fetch(URL)
    .then(res => res.text())
    .then(body => {
      items = JSON.parse(body).users;
    });
  console.log('Server Starting. Time:', new Date());
});
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({secret: 'mysecret', resave: true, saveUninitialized: true}))
    .use((req, res, next) => {
      if (!req.session.auth) {
        req.session.auth = '';
      }
      next();
    })
    .get('/', (req, res) => {
      res.render('login', {title: 'Nice Page', msg: 'Nice Page, pal'});
    })
    .get('/login', (req, res) => {
      res.render('login', {title: 'Nice Page', msg: 'Login Page, pal'});
    })
    .get('/author', (req, res) => {
      res.send('Юлия Севостьянова');
    })
    .post('/login/check/', (req, res) => {
      console.log(req.body.login);
      console.log(req.body.pass);
      items.forEach((item) => {
        if ((item.login == req.body.login) && (item.password == req.body.pass)) {
          req.session.auth = 'ok';
          console.log('successful');
          return null;
        }
      });
      res.redirect('/users');
    })
    .get('/users/', (req, res) => {
      if (req.session.auth == 'ok') {
        res.send('<a href="../logout">Logout</a>');
      } else {
        res.redirect('/login');
      }
    })
    .get('/logout', (req, res) => {
      req.session.auth = null;
      res.redirect('/login');
    });
