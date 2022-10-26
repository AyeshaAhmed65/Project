const Student = require("../Model/studentModel");
const Faculty = require("../Model/facultyModel");
const MessagesModel = require("../Model/messagesModel");
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessagesModel.create({
      message: message,
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Success" });
    } else {
      return res.json({ msg: "Failed" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await MessagesModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const mappedMessages = messages.map((msg) => {
      return {
        yourMessage: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    return res.json(mappedMessages);
  } catch (err) {
    next(err);
  }
};
