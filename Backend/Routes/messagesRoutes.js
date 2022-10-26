const {
  addMessage,
  getMessages,
} = require("../Controllers/messagesController");
const router = require("express").Router();

router.post("/addMessage", addMessage);
router.post("/getMessage", getMessages);

module.exports = router;
