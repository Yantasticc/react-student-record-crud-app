import React from 'react'

const Home = () => {
  return (
    <div className='container mt-5'>
      <h1 className='mt-5 text-center'>WELCOME TO MERN STACK CRUD PROJECT</h1>
      <div className='row mt-5'>
        <div className='col-md-6'>
          <h5>Front-End Technology</h5>
          <div class="card shadow">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">React.Js</li>
              <li class="list-group-item">HTML,CSS,Bootstrap 5.3</li>
              <li class="list-group-item">React Router DOM 6.22.3</li>
            </ul>
          </div>
        </div>
        <div className='col-md-6'>
          <h5 >Back-End Technology</h5>
          <div class="card shadow">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Node js</li>
              <li class="list-group-item">Express JS </li>
              <li class="list-group-item">Mongodb</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
