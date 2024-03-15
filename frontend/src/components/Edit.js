import React, { useState ,useEffect} from 'react'
import { NavLink ,useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {

  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    "name": "",
    "course":"",
    "address":"",
    "contact":""
  });

  // onChange
  const setStudent = (e) => {
    console.log(e.target.value)
    const {name, value} = e.target;
    setInputData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  // get single students data by id
  const { id } = useParams("");

  const getStudentData = async () => {
    const res = await fetch(`https://react-student-record-crud-app-api.vercel.app/getStudentById/${id}`, {
      method:"GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    if(res.status === 400 || res.status === 404 || !data){
      console.log('Error')
    }
    else {
      setInputData(data);
      console.log("Success")
    }
  }

  useEffect(()=> {
    getStudentData();
  }, [])

  // get exisiting student data
  const updateStudent = async(e) =>{
    e.preventDefault()

    const { name, course, address, contact } = inputData;
    const res = await fetch(`https://react-student-record-crud-app-api.vercel.app/updateStudent/${id}`, {
      method:'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,course,address,contact
      })
    })

    const data = await res.json();
    setInputData(data);
    toast.success('Please  check your updated information!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true, 
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/AllStudents');
    }, 3000);
  }

  return (
    <div className='container mt-5'>
      <h4>Edit Student Information</h4>
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
          <button className='btn btn-primary' onClick={updateStudent}>update Student</button>
          <ToastContainer />
          <NavLink className='btn btn-primary ms-auto' to="/AllStudents">Back to Home</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Edit
