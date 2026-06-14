const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        default: "3 Months"
    },

    price: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);