const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authentication);
router.get("/courses", Controller.courseList);
router.get("/courses/mycourses", Controller.myCourses);
router.post("/courses/mycourses/add/:CourseId", Controller.addMyCourse);
router.patch("/courses/mycourses/complete/:CourseId", Controller.completeMyCourse);
router.delete("/courses/mycourses/remove/:CourseId", Controller.removeMyCourse);

module.exports = router;
