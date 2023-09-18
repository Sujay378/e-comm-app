const router = require('express').Router();

const { request, submit } = require('../controllers/otpController');

router.get('/request', request);

router.post('/submit', submit);

module.exports = router;
