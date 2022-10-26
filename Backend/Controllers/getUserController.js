const Faculty = require("../Model/facultyModel");
const Student = require("../Model/studentModel");

module.exports.getStudents = async (req, res, next) => {
  try {
    const aud = req.params.id;
    if (aud) {
      const students = await Student.find({ aud: { $ne: aud } }).select([
        "firstName",
        "lastName",
        "course",
        "semester",
        "image",
        "hasImage",
        "bio",
      ]);

      return res.json(students);
    } else {
      const students = await Student.find().select([
        "firstName",
        "lastName",
        "course",
        "semester",
        "image",
        "hasImage",
        "bio",
      ]);

      return res.json(students);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getFaculties = async (req, res, next) => {
  try {
    const fid = req.params.id;
    const checkIsFaculty = await Faculty.findOne({ fid });
    if (checkIsFaculty) {
      const faculties = await Faculty.find({ fid: { $ne: fid } }).select([
        "firstName",
        "lastName",
        "course",
        "image",
        "hasImage",
        "bio",
      ]);

      return res.json(faculties);
    } else {
      const faculties = await Faculty.find().select([
        "firstName",
        "lastName",
        "course",
        "image",
        "hasImage",
        "bio",
      ]);

      return res.json(faculties);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getSeniors = async (req, res, next) => {
  try {
    const aud = req.params.id;
    if (aud) {
      let seniors = [];
      let user = await Student.findOne({ aud });
      const students = await Student.find().select([
        "aud",
        "firstName",
        "lastName",
        "course",
        "semester",
        "image",
        "hasImage",
        "bio",
      ]);

      if (user) {
        for (let i = 0; i < students.length; i++) {
          if (
            user.aud !== students[i].aud &&
            user.course === students[i].course &&
            user.semester < students[i].semester
          ) {
            seniors.push(students[i]);
          }
        }

        return res.json(seniors);
      } else {
        return res.json({
          msg: "Cannot Find User !",
          status: false,
        });
      }
    } else {
      return res.json({
        msg: "Please Provide An AUD !",
        status: false,
      });
    }
  } catch (err) {
    next(err);
  }
};
