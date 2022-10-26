const { studentRegister } = require("../Controllers/studentController");
const { getStudents, getSeniors } = require("../Controllers/getUserController");
const router = require("express").Router();

router.post("/register/Student", studentRegister);
router.get("/allStudents/:id", getStudents);
router.get("/allSeniors/:id", getSeniors);
module.exports = router;
