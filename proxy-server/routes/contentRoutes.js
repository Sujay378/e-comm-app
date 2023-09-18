const router = require('express').Router();
const fs = require('fs');

const { getContentPath } = require('../helpers/getFilePath');

const getContent = (cb) => {
  fs.readFile(getContentPath('content'), {encoding: 'utf-8'}, (err, data) => {
    if(!err) {
      const dataJSON = JSON.parse(data);
      cb(200, dataJSON)
    } else {
      cb(400, { errorMsg: "Failed to load content" });
    }
  })
}

router.get('/', (req, res, next) => {
  getContent((statusCode, response) => {
    res.status(statusCode).json(response);
    res.end();
  })
});

module.exports = router;
