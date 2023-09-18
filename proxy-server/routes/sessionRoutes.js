const router = require("express").Router();
const { generate, endSession } = require("../controllers/sessionController");

router.get("/generate", generate);

router.post("/end", endSession);

module.exports = router;
