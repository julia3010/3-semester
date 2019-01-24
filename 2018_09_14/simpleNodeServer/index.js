const http = require('http');
const url = require("url");

const server = http.createServer();

server.listen(3030);

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  let params = url.parse(req.url).pathname;

  const parsedParams = params.split('/').filter(n => n);

  console.log(parsedParams);

  if (parsedParams[0] === 'add' && parsedParams[1] && parsedParams[2]) {
    res.end(JSON.stringify({ "Сумма": +parsedParams[1] + +parsedParams[2] }));
  } else {
    res.end('Запрос отсутствует или неверный');
  }
});
