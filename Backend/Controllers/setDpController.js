const Student = require("../Model/studentModel");
const Faculty = require("../Model/facultyModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "DisplayPictures");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("image");

module.exports.setDp = async (req, res, next) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500);
      } else {
        return res.status(200).send(req.file);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateDp = async (req, res, next) => {
  try {
    const image = req.body.filePath;
    const aud = String(req.body.id);
    let hasImage = false;
    if (image !== "") {
      hasImage = true;
    }
    const checkDupelicateAud = await Student.findOneAndUpdate(
      { aud },
      {
        hasImage,
        image,
      }
    );
    if (checkDupelicateAud) {
      return res.json({
        msg: "Account Image Added !",
        status: true,
      });
    } else {
      let fid = aud;
      const checkDupelicateFid = await Faculty.findOneAndUpdate(
        { fid },
        { hasImage: true, image }
      );
      if (checkDupelicateFid) {
        return res.json({
          msg: "Account Image Added !",
          status: true,
        });
      } else {
        return res.json({
          msg: "Cannot Find Account !",
          status: false,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
