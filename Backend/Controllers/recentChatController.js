const Student = require("../Model/studentModel");
const Faculty = require("../Model/facultyModel");
const recentChatModel = require("../Model/recentChatModel");

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

async function updateChat(from, to) {
  const data = await recentChatModel.find({
    user: from,
  });
  let stack = [];
  if (data.length > 0) {
    stack = data[0].users;
  }
  if (stack.length > 0) {
    const userExists = stack.find((element) => element === to);

    if (userExists) {
      const index = stack.indexOf(to);
      array_move(stack, index, 0);
    } else {
      stack.unshift(to);
    }
  } else {
    stack.unshift(to);
  }
  const del = await recentChatModel.findOneAndDelete({
    user: from,
  });
  const newRecentChat = await recentChatModel.create({
    user: from,
    users: stack,
  });
  return newRecentChat;
}

module.exports.updateRecentChat = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const newRecentChat = await updateChat(from, to);
    updateChat(to, from);
    if (newRecentChat) {
      return res.json({ newRecentChat });
    } else {
      return res.json({ msg: "Failed" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getRecentChat = async (req, res, next) => {
  try {
    const { from } = req.body;
    const newRecentChat = await recentChatModel.find({
      user: from,
    });
    if (newRecentChat) {
      return res.json({ newRecentChat });
    } else {
      return res.json({ msg: "Failed" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getRecentChatFunc = async (to) => {
  const newRecentChat = await recentChatModel.find({
    user: to,
  });
  return newRecentChat;
};
