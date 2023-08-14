const fs = require('fs');
const uniqid = require('uniqid');
const { getSessionDBPath } = require('../helpers/getFilePath')

class Session {
  constructor() {}

  getExistingSessions(cb) {
    fs.readFile(getSessionDBPath(), { encoding: 'utf-8' }, (err, data) => {
      if(err) return cb(err, '');
      cb('', JSON.parse(data));
    })
  }

  updateSessionDB(data) {
    fs.writeFileSync(getSessionDBPath(), JSON.stringify(data));
  }

  generateNewSession(cb) {
    const id = uniqid();
    this.getExistingSessions((err, data) => {
      if(err) return cb({ type: "sessionGenFailed" }, '');
      const newData = [...data, { id }];
      this.updateSessionDB(newData);
      cb('', { id });
    })
  }

  getCurrentSession(sessionId, cb) {
    this.getExistingSessions((err, data) => {
      if(err) return cb({
        type: 'dbSearchFailed'
      });

      cb('', data.find(session => session.id === sessionId));
    })
  }

  removeSession(sessionId) {
    this.getExistingSessions((err, data) => {
      if(err) return cb({ type: "sessionEndFailed" });
      const newData = data.filter(session => session.id !== sessionId);
      this.updateSessionDB(newData);
    })
  }

  addAuthKey(sessionId, key, cb) {
    this.getExistingSessions((err, data) => {
      if(err) return cb(err);
      const currSession = data.find(session => session.id === sessionId);
      currSession.authKey = key;
      const filteredSessions = data.filter(session => session.id !== sessionId);
      this.updateSessionDB([...filteredSessions, currSession]);
      cb();
    })
  }

  adde2eKey(sessionId, key, cb) {
    this.getExistingSessions((err, data) => {
      if(err) return cb(err);
      const currSession = data.find(session => session.id === sessionId);
      currSession.e2eKey = key;
      const filteredSessions = data.filter(session => session.id !== sessionId);
      this.updateSessionDB([...filteredSessions, currSession]);
    })
  }

  removeKey(sessionId, keyType, cb) {
    this.getExistingSessions((err, data) => {
      if(err) return cb(err);
      const currSession = data.find(session => session.id === sessionId);
      delete currSession[keyType];
      this.updateSessionDB([...data.filter(session => session.id !== sessionId), currSession]);
    })
  }
}

module.exports = new Session();
