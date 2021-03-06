const express = require('express');
const app = express();
const zlib = require('zlib');
const path = require('path');
const trans = require('./trans');

app.get('/', function (req, res) {
  res.send('nothing');
});

app.get('/zip', (req, res) => {
    res.sendFile(path.join(__dirname+'/gzip.html'));
  })
  .post('/zip', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename=result.zip',});
    req
      .pipe(trans)
      .pipe(zlib.createGzip())
      .pipe(res);
});

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
