const path = require('path');
const { getRootDir } = require('../util');

const getContentPath = (fileName) => path.join(getRootDir(), 'static-db', 'content-response', `${fileName}.json`);

const getEnvPath = () => path.join(getRootDir(), '.env');

module.exports = { getContentPath, getEnvPath };
