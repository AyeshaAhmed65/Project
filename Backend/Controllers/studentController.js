const Student = require("../Model/studentModel");
const Faculty = require("../Model/facultyModel");

module.exports.studentRegister = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      password,
      course,
      aud,
      semester,
      image,
      hasImage,
    } = req.body;

    const checkDupelicateAud = await Student.findOne({ aud });

    if (checkDupelicateAud) {
      return res.json({
        msg: "Account Already Exists With Same AUD",
        status: false,
      });
    } else {
      let fid = aud;
      const checkDupelicateFid = await Faculty.findOne({ fid });
      if (checkDupelicateFid) {
        return res.json({
          msg: "Account Already Exists With Same AUD",
          status: false,
        });
      } else {
        const newStudent = await Student.create({
          firstName,
          lastName,
          password,
          course,
          aud,
          semester,
          image,
          hasImage,
        });
        return res.json({ status: true, newStudent });
      }
    }
  } catch (err) {
    next(err);
  }
};
