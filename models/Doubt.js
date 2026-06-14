const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Doubt", doubtSchema);