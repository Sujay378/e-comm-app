const main = require.main;
const fs = require('fs');

const getRootDir = () => main.path;

const getKey = () => fs.readFileSync('./proxy-server/secret.txt');

module.exports = { getRootDir, getKey };
