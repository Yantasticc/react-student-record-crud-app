const express = require('express');
const { handleCreateStudent, handleStudentDetails, handleGetStudentByName, handleGetStudentById, handleDeleteStudent, handleUpdateStudent } = require('../controllers/routes.js');

const router = express.Router();

// create a new student
router.post('/addStudent', handleCreateStudent);

// get all student details
router.get('/getStudent', handleStudentDetails);

// get student by name
router.get('/getStudentByName/:name', handleGetStudentByName)

// get student by ID
router.get('/getStudentById/:id', handleGetStudentById)

// delete student details
router.delete('/deleteStudent/:id', handleDeleteStudent)

// update student details
router.patch('/updateStudent/:id', handleUpdateStudent)

module.exports = router;
