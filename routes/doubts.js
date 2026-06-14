const express = require("express");
const router = express.Router();

const Doubt = require("../models/Doubt");
const authMiddleware = require("../middleware/authMiddleware");


// =======================
// POST DOUBT (MOCK AI)
// =======================
router.post("/", authMiddleware, async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question required" });
        }

        let answer = "";
        const q = question.toLowerCase();

        if (q.includes("physics")) {
            answer = `
Newton's Laws:
1. Inertia
2. F = ma
3. Action-Reaction

Practice numericals daily.
            `;
        }

        else if (q.includes("math")) {
            answer = `
Math Tips:
- Focus on Calculus
- Algebra practice
- Solve PYQs
            `;
        }

        else if (q.includes("chemistry")) {
            answer = `
Chemistry:
- NCERT revision
- Organic reactions
- Periodic table trends
            `;
        }

        else {
            answer = `
Keep practicing consistently 🚀
Concept clarity is key for JEE success.
            `;
        }

        // Save to DB
        const doubt = new Doubt({
            userId: req.user.id,
            question,
            answer
        });

        await doubt.save();

        res.json({ question, answer });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// =======================
// GET HISTORY
// =======================
router.get("/", authMiddleware, async (req, res) => {

    try {

        const doubts = await Doubt.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.json(doubts);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;