const path = require('path');
const { getRootDir } = require('../util');

const getEnvPath = () => path.join(getRootDir(), '.env');

const getDBPath = () => path.join(getRootDir(), '../', 'static-db');

const getContentPath = (fileName) => path.join(getDBPath(), 'content-response', `${fileName}.json`);

const getUserDBPath = () => path.join(getDBPath(), 'users', 'user-db.json');

const getSessionDBPath = () => path.join(getDBPath(), 'session', 'session-db.json');

module.exports = { getContentPath, getEnvPath, getUserDBPath, getSessionDBPath };
