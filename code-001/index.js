/*Julia Sevostyanova*/
const crypto = require('crypto');
const fs = require('fs');
var key = fs.readFileSync('./key');
var buffer = fs.readFileSync('./secret');
var answer = crypto.publicDecrypt(key, buffer);
console.log(answer.toString());
