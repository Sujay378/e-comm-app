const main = require.main;
const cryptoJs = require('crypto-js');
const otpGenerator = require('otp-generator');

const getRootDir = () => main.path;

const generateKey = () => cryptoJs.lib.WordArray.random(16).toString();

const generateOTP = () => otpGenerator.generate(6, {
  lowerCaseAlphabets: false,
  specialChars: false,
  upperCaseAlphabets: false,
  digits: true
});

module.exports = { getRootDir, generateKey, generateOTP };
