const router = require("express").Router();
const {
  register,
  login,
  logout,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.post("/reset/password", resetPassword);

router.get('/logout', logout);

module.exports = router;
