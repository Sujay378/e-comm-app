const router = require("express").Router();
const { generateE2eKey } = require('../controllers/e2eController');

router.get("/key", generateE2eKey);

module.exports = router;
