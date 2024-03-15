const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },address: {
        type: String,
        required: true,
    },contact: {
        type: Number,
        required: true,
        unique: true,
    },
})

const students = new mongoose.model("students", studentSchema);
module.exports = students;