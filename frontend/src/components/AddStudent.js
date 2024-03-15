import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AddStudent = () => {

  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    "name": "",
    "course": "",
    "address": "",
    "contact": ""
  });

  // onChange 
  const setStudent=(e)=>{
    console.log(e.target.value);
    setInputData({ ...inputData, [e.target.name]: e.target.value });   
}

  // onClick 
  const addInputData = async (e) => {
    e.preventDefault();

    const { name, course, address, contact } = inputData;

    const res = await fetch("https://react-student-record-crud-app-api.vercel.app/addStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, course, address, contact })
    })

    const data = res.json();
    console.log(data)

    if (res.status === 400 || !data) {
      console.log("error ");
      alert("error");
    } 
    else {
      setInputData(data);
      toast.success('Please wait  !', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true, 
          progress: undefined,
          });

      setTimeout(() => {
          navigate('/AddStudent');
        }, 3000);
    }
  }

  return (
    <div className='container mt-5'>
      <h4>All New Student Information</h4>
        <div className='underline1'></div>
          <form className='mt-5 shadow p-5 w-75'>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Student Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="exampleFormControlInput1" 
                  placeholder="Enter Student Name" 
                  onChange={setStudent} 
                  name="name" 
                  value={inputData.name}
                />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Course</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="exampleFormControlInput1" 
                      placeholder="Enter Course Name" 
                      onChange={setStudent} 
                      name="course" 
                      value={inputData.course}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Address</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="exampleFormControlInput1" 
                      placeholder="Enter Student Address"
                      onChange={setStudent}
                      name="address" 
                      value={inputData.address}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Mobile</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="exampleFormControlInput1" 
                      placeholder="Enter Contact Number"
                      onChange={setStudent} 
                      name="contact" 
                      value={inputData.contact}
                    />
                </div>
                <div className='d-flex'>
                  <button className='btn btn-primary' onClick={addInputData}>Add Student</button>
                  <ToastContainer />
                  <NavLink className='btn btn-primary ms-auto' to="/AllStudents">Back to Home</NavLink>
                </div>
            </form>
        </div>
  )
}

export default AddStudent
