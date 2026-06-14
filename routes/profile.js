const express = require("express");
const router = express.Router();

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/test", (req, res) => {
    res.send("Profile Route Working");
});
// GET PROFILE

router.get("/", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE PROFILE

router.put("/", authMiddleware, async (req, res) => {

    try {

        const { name } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name },
            { new: true }
        ).select("-password");

        res.json({
            message: "Profile Updated Successfully",
            user: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;