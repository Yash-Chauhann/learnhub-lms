const express = require("express");
const router = express.Router();

const Course = require("../models/Course");

// GET ALL COURSES
router.get("/", async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

module.exports = router;