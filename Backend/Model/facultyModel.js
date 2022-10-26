const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  course: {
    type: String,
    required: true,
    unique: false,
  },
  fid: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "",
  },
  hasImage: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    default: "Faculty At Amity University Dubai",
  },
});

module.exports = mongoose.model("Faculties", facultySchema);
