const express = require('express');
const app = express();
const fetch = require('node-fetch');
const Parser = require('rss-parser');
const parser = new Parser();

app.get('/', function (req, res) {
  res.send('nothing');
});

app.get('/:n1', function (req, res) {
  var linksAmount = +req.params.n1;
  var answer = '';
  var feed = parser.parseURL('https://nodejs.org/en/feed/blog.xml');
  feed.then(result => {
    for (var i = 0; i < linksAmount; i++) {
      answer += `<p><a href='${result.items[i].link}' target='_blank'>${result.items[i].title}</a></p>`;
    }
  res.send(answer);
  });
});

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
