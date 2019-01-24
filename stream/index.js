const express = require('express');
const app = express();
const http = require('http');

app.get('/', function (req, res) {
  res.send('nothing');
});

app.get('/buffer', (req, res) => {
    const URL = 'http://kodaktor.ru/api2/buffer2';
    const num = 333;
    const reg = /\w{4}/g;
    let word = '';
    const numsArr = [...Array.from(Array(2).keys(), x => x + num)];
    const length = numsArr.length;
    const resArr = [];
    numsArr.forEach(number => {

      http.get(`${URL}/${number}`, response => {
        let data = '';
        response.on('data', chunk => {
          const found = String(chunk).match(reg);
          if (found && !word) {
            let [foundWord] = found;
            word = foundWord;
          }
          data += chunk;
        });
        response.on('end', () => {
          resArr.push({
            number: number,
            size: data.length,
          });

          if(resArr.length === length) {
            let result = resArr.map((item) => {
              return `Number: ${item.number} Size (V2): ${item.size} <br>`;
            })
            res.send(`Secret word: <strong>${word}</strong> <br> ${result}`);
          }
        });
      });
    });
  })

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
