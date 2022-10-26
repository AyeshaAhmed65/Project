const { facultyRegister } = require("../Controllers/facultyController");
const { getFaculties } = require("../Controllers/getUserController");
const router = require("express").Router();

router.post("/register/Faculty", facultyRegister);
router.get("/allFaculties/:id", getFaculties);
module.exports = router;
