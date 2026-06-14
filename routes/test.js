const express = require("express");
const router = express.Router();

const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");


// GET TEST QUESTIONS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const questions = await Question.find()
            .limit(10);

        res.json(questions);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});


// SUBMIT TEST
router.post("/submit", authMiddleware, async (req, res) => {

    try {

        const { answers } = req.body;

        let score = 0;

        for (let ans of answers) {

            const q = await Question.findById(ans.questionId);

            if (q && q.answer === ans.selected) {
                score++;
            }
        }

        res.json({
            message: "Test Completed",
            score
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

module.exports = router;