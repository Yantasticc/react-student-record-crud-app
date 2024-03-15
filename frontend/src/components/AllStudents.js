import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AllStudents = () => {

    const [getStudent, setGetStudent] = useState([]);

    // get all students data
    const  getAllStudents = async()=>{
        const res = await fetch("http://localhost:8001/getStudent", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(getStudent)
        const data = await res.json();

        if(res.status === 404 || !data){
            console.log("Error");
        }else{
            setGetStudent(data);
            console.log("All students data")
        }
    }

    // suspecious: checkout
    useEffect(()=>{
        getAllStudents();
    }, [])

    // Delete student data
    const deleteStudent = async (id) => {
        const res = await fetch(`http://localhost:8001/deleteStudent/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const deleteData = await res.json();
        if(res.status === 400 || !deleteData){
            console.log("Error deleting the data")
        }
        else{
            getAllStudents();
        }
    }

    // Search  for a specific student
    const [searchInput, setSearchInput] = useState('');
    const searchStudent = (searchValue) => {
        setSearchInput(searchValue.toLowerCase());
    }

  return (
    <div className='container mt-5'>
       <div className='d-flex'>
            <h4>All Student Information</h4>
            <div class="ms-auto w-50">
                <input 
                    type="email" 
                    class="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="Search Student" 
                    onChange={(e)=>searchStudent(e.target.value)}
                />
            </div>        
        </div>

        <div className='underline'></div>
        <table className='table table-bordered mt-5'>
            <thead className='table-dark'>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Course</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact </th>
                    <th scope="col">Action </th>
                </tr>
            </thead>

            <tbody>
                {
                    getStudent.filter((val) => {
                        if(searchInput === ''){
                            return val;
                        }
                        else if(val.name.toLowerCase().includes(searchInput)){
                            return val;
                        }
                    }).map((result, id) => {
                        return (
                            <>
                                <tr key={id}>
                                    <th scope='row'>{id+1}</th>
                                    <td>{result.name}</td>
                                    <td>{result.course}</td>
                                    <td>{result.address}</td>
                                    <td>{result.contact}</td>
                                    <td>
                                        <Link className='btn btn-success ms-2' to={`/view/${result._id}`}>View</Link>
                                        <Link className='btn btn-warning ms-2' to={`/edit/${result._id}`}>Update</Link>
                                        <button 
                                            className='btn btn-danger ms-2'
                                            data-bs-toggle="modal" 
                                            data-bs-target="#exampleModal" 
                                            onClick={() => deleteStudent(result._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default AllStudents
