const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');
const bodyParser = require('body-parser');
var items;

http.listen(1234, function() {
  console.log('Server is started');
});

app
    .set('view engine', 'pug')
    .set('views', __dirname + '/views/pug')
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(session({secret: 'mysecret', resave: true, saveUninitialized: true}))
    .get('/', (req, res) => {
      res.sendFile(__dirname + '/views/index.html');
    })
    .get('/res/:file', (req, res) => {
      //console.log(req.params.file);
      res.sendFile(`${__dirname}/res/${req.params.file}`);
    })
    .get('/res/pics/:file', (req, res) => {
      res.sendFile(`${__dirname}/res/pics/${req.params.file}`);
    })
    .get('/login', (req, res) => {
      res.render('login', {title: 'Welcome to the Chat', msg: ''});
    })
    .post('/login/check/', (req, res) => {
      console.log(req.body.login);
      console.log(req.body.pass);
      if ((req.body.login == 'admin') && (req.body.pass == 'admin')) {
        req.session.auth = 'ok';
        console.log('successful');
      }
      res.redirect('/admin');
    })
    .get('/admin', (req, res) => {
      if (req.session.auth != 'ok') {
        res.redirect('/');
      } else {
        //res.send('you are admin');
        res.sendFile(`${__dirname}/admin.html`);
      }
    })
    .get('/logout', r => {
      r.session.auth = null;
      r.res.redirect('/login');
    })

var clients = 0;
io.on('connection', (socket) => {

  clients++;
  console.log('User Connected');
  io.sockets.emit('broadcast', `${clients} connected`);

  socket.on('message', (data) => {
    io.sockets.emit('message', data);
    console.log(data);
  });

  socket.on('imgMessage', (data) => {
    io.sockets.emit('imgMessage', data);
    console.log(data);
  });

  socket.on('disconnect', function () {
    clients--;
    //socket.broadcast.emit('broadcast', `${clients} connected`);
    io.sockets.emit('broadcast', `${clients} connected`);
    console.log('A user disconnected');
  });
});
