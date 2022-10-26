const Faculty = require("../Model/facultyModel");
const Student = require("../Model/studentModel");

module.exports.facultyRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, password, course, fid, image, hasImage } =
      req.body;

    const checkDupelicateFid = await Faculty.findOne({ fid });

    if (checkDupelicateFid) {
      return res.json({
        msg: "Account Already Exists With Same FID",
        status: false,
      });
    } else {
      let aud = fid;
      const checkDupelicateAud = await Student.findOne({ aud });
      if (checkDupelicateAud) {
        return res.json({
          msg: "Account Already Exists With Same FID",
          status: false,
        });
      } else {
        const newFaculty = await Faculty.create({
          firstName,
          lastName,
          password,
          course,
          fid,
          image,
          hasImage,
        });
        return res.json({ status: true, newFaculty });
      }
    }
  } catch (err) {
    next(err);
  }
};
