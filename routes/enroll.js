const express = require("express");
const router = express.Router();

const Enrollment = require("../models/Enrollment");
const authMiddleware = require("../middleware/authMiddleware");

// ENROLL COURSE
router.post("/", authMiddleware, async (req, res) => {

    const { courseId } = req.body;

    const enroll = new Enrollment({
        userId: req.user.id,
        courseId
    });

    await enroll.save();

    res.json({ message: "Enrolled Successfully 🚀" });
});

module.exports = router;