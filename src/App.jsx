import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

import ClientRoute from './Routes/ClientRoute'
import AdminRoute from './Routes/AdminRoute';
import ProfessionalRoute from './Routes/ProfessionalRoute';




function App() {


  return (
    <>
       
      <Routes>
           <Route path='/*' element={<ClientRoute />} />
           <Route path='/admin*' element={<AdminRoute />} />
           <Route path='/professional*' element={<ProfessionalRoute />} />

      </Routes>
     
     
    </>
  )
}

export default App
