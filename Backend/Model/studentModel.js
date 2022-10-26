const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  aud: {
    type: String,
    required: true,
    unique: true,
  },
  semester: {
    type: String,
    required: true,
    unique: false,
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
    default: "Student At Amity University Dubai",
  },
});

module.exports = mongoose.model("Students", studentSchema);
