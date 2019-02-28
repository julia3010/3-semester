/*Julia Sevostyanova*/
const crypto = require('crypto');
const fs = require('fs');
var key = fs.readFileSync('./key');
var buffer = fs.readFileSync('./answer');
var answer = crypto.publicEncrypt(key, buffer);
console.log(answer.toString());
