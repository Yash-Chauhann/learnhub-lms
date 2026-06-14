const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    subject: String,   // physics, chemistry, maths

    question: String,

    options: [String],

    answer: String,

    level: {
        type: String,
        default: "easy"
    }

});

module.exports = mongoose.model("Question", questionSchema);