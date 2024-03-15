require('dotenv').config();

const express = require('express')
const app = express();
const router = require('./router/router.js')

var cors = require('cors')
app.use(cors(
    {
        origin: ["https://react-student-record-crud-app-frontend.vercel.app/"],
        methods: ['POST', 'GET', 'DELETE', 'PATCH'],
        credentials: true
    }
))
app.use(express.json())
app.use(router)

const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI; 

mongoose.connect(URI).then(()=> {
    console.log("Database connected successfully")
}). catch((err)=> {
    console.log(err)
})

const port = 8001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});