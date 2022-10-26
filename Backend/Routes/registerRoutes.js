const { facultyRegister } = require("../Controllers/facultyController");
const { studentRegister } = require("../Controllers/studentController");
const { setDp, updateDp } = require("../Controllers/setDpController");

const router = require("express").Router();

router.post("/register/Faculty", facultyRegister);
router.post("/register/Student", studentRegister);
router.post("/register/setDisplayPicture", setDp);
router.post("/register/updateDisplayPicture", updateDp);
module.exports = router;
