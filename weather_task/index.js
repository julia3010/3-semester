const http = require('http');
const url = require("url");
const fetch = require('node-fetch');

const server = http.createServer();

server.listen(3030);

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    answer = 'init';
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Moscow,ru&APPID=13cc00e0049ff8807b4f08727da2e7be')
      .then((response) => { return response.json() })
      .then(body => {
        console.log(body);
        res.write('Температура в Москве: ' + Math.round(body.main.temp - 273,15) + '°' + '<br>');
        res.write(`На основе <a href='https://openweathermap.org/api'>OpenWeatherMap API</a> `);
        res.end();
      });
  }
);
