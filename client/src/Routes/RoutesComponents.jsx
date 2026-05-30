import React from 'react'
import {Routes, Route} from 'react-router-dom';
import ShowTask from '../ShowTask';
import Login from '../../login';
import Signup from '../../signup'

const RoutesComponents = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShowTask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default RoutesComponents
