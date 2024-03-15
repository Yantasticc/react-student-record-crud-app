import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter }  from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AllStudents from './components/AllStudents';
import AddStudent from './components/AddStudent';
import View from './components/View';
import Edit from './components/Edit';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/allStudents' element={<AllStudents />} />
        <Route path='/AddStudent' element={<AddStudent />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App
