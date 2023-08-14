const main = require.main;
const fs = require('fs');
const cryptoJs = require('crypto-js');
const passphrase = require('generate-passphrase');

const getRootDir = () => main.path;

const getKey = () => fs.readFileSync('./proxy-server/secret.txt');

const generateKey = () => cryptoJs.PBKDF2(
  passphrase.generate({ length: 8, separator: '.', titlecase: true, numbers: true, uppercase: true }),
  cryptoJs.lib.WordArray.random(256/32),
  { keySize: 8, iterations: 5 }
).toString();

module.exports = { getRootDir, getKey, generateKey };
