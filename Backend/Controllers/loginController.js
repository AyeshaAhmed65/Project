const Student = require("../Model/studentModel");
const Faculty = require("../Model/facultyModel");

module.exports.login = async (req, res, next) => {
  try {
    const { password, aud } = req.body;

    let user = await Student.findOne({ aud });

    if (!user) {
      let fid = aud;
      user = await Faculty.findOne({ fid });
      if (!user) {
        return res.json({
          msg: "Invalid Credentials !",
          status: false,
        });
      } else {
        if (password === user.password) {
          return res.json({ status: true, user });
        } else {
          return res.json({
            msg: "Invalid Credentials !",
            status: false,
          });
        }
      }
    } else {
      if (password === user.password) {
        return res.json({ status: true, user });
      } else {
        return res.json({
          msg: "Invalid Credentials !",
          status: false,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
