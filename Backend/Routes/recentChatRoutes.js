const {
  updateRecentChat,
  getRecentChat,
} = require("../Controllers/recentChatController");
const router = require("express").Router();

router.post("/updateRecentChat", updateRecentChat);
router.post("/getRecentChat", getRecentChat);

module.exports = router;
