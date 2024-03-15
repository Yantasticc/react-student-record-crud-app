import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom';

const View = () => {

  const [showData, setShowData] = useState([]);

  const { id } = useParams("");
  console.log(id);
  
  // Get data by ID
  const getStudentData = async () => {
    const res = await fetch(`http://localhost:8001/getStudentById/${id}`, {
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
      setShowData(data);
      console.log("Success")
    }
  }

  useEffect(()=> {
    getStudentData();
  }, [])

  return (
    <div className='container mt-5'>
      <h4>All Student Information</h4>
      <ul className="list-group w-50 mt-4">
        <li className="list-group-item active" aria-current="true">Student Data</li>
        <li className="list-group-item">Student Name:- {showData.name}</li>
        <li className="list-group-item">Student Course:- {showData.course}</li>
        <li className="list-group-item">Student Address:- {showData.address}</li>
        <li className="list-group-item">Student Contact:- {showData.contact}</li>
      </ul>
      <Link className='btn btn-primary mt-5' to="/AllStudents">Back</Link>
    </div>
  )
}

export default View
