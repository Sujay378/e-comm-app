const path = require('path');
const { getRootDir } = require('../util');

const getEnvPath = () => path.join(getRootDir(), '.env');

const getDBPath = () => path.join(getRootDir(), '../', 'static-db');

const getContentPath = (fileName) => path.join(getDBPath(), 'content-response', `${fileName}.json`);

module.exports = { getContentPath, getEnvPath };
