const express = require("express");
const {
  createCourse,
  // createStudent,
  createStudents,
  addCourse,
  marksEntry,
  getStudents,
  getStudent,
  createAdmin,
  login,
  resetPasswordMail,
  resetPassword,
  getCourses,
  getSemStudents,
  getMarks,
  getMarksForChart,
  getSingleMarks,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/create/course", createCourse);
// router.post('/create/student', createStudent);
router.get("/create", createStudents);
router.get("/join", addCourse);

router.post("/getsinglemarks", getSingleMarks);
router.post("/markschart", getMarksForChart)
router.post('/getmarks', getMarks);

router.post('/get/courses', getCourses);

router.post("/marks", marksEntry);
router.post("/get", getStudents);
router.post("/getone", getStudent);
router.post("/create/admin", createAdmin);

router.post("/login", login);

router.post("/restetpassword", resetPasswordMail);

router.post("/reset/:token", resetPassword);

router.get("/get/:sem",getSemStudents);

module.exports = router;
