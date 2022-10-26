const { login } = require("../Controllers/loginController");

const router = require("express").Router();

router.post("/login", login);
module.exports = router;
