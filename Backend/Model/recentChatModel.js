const mongoose = require("mongoose");

const recentChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students" || "faculties",
    required: true,
  },
  users: Array,
});

module.exports = mongoose.model("recentChats", recentChatSchema);
