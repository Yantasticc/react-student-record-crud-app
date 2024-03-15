const express = require('express')
const router = express.Router()
const students = require('../models/studentSchema.js')

// create a new student
async function handleCreateStudent(req, res) {
    const { name, course, address, contact } = req.body;

    try {
        if (!name || !course || !address || !contact) {
            return res.status(400).json("Please fill in the details");
        }

        const findStud = await students.findOne({ contact: contact });

        if (findStud) {
            return res.status(409).send(`A student with this Contact number already exists.`);
        }

        const addStudent = new students({ name, course, address, contact });
        await addStudent.save();
        res.status(201).json(addStudent);

    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}

// get all student details
async function handleStudentDetails(req, res) {
    try {
        const studentData = await students.find();
        res.status(200).json(studentData);
    }
    catch(err){
        res.status(404).json({"message": "No data found!"})
    }
}

// get student by name
async function handleGetStudentByName(req, res) {
    const { name } = req.params;

    try {
        const student = await students.findOne({ name: name })

        if(student){
            res.status(200).json(student);
        }
        else {
            res.status(404).json({"message": "No data found for the give name"});
        }
    }
    catch(err) {
        res.status(400).json(err)
    }
}

// get student by ID
async function handleGetStudentById(req,res) {
    const { id } = req.params;

    try {
        const student = await students.findById(id);

        if(student) {
            res.status(200).json(student);
        }
        else {
            res.status(404).json({"message": "No data found for the give id"});
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// delete student details
async function handleDeleteStudent(req, res) {
    try {
        const { id } = req.params;
        const deleteStudent = await students.findByIdAndDelete({_id: id})
        res.status(200).json({"message" : "Student details have been deleted successfully"})
    } catch (err) {
        res.status(400).json(err)
    }
}

// update student details
async function handleUpdateStudent(req, res) { 
    try {
        const { id } = req.params;

        const updateStudent = await students.findByIdAndUpdate(id, req.body ,{new: true}); // return updated document

        res.status(202).json(updateStudent);
    }
    catch(err) {
        res.status(400).json(err)
    }
}

module.exports = {
    handleCreateStudent,
    handleStudentDetails,
    handleGetStudentByName,
    handleGetStudentById,
    handleDeleteStudent,
    handleUpdateStudent,
};
