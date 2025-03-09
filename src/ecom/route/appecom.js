// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Ecom_route from './ecom_route';
import AdminEcom_route from './admin_route';
import EcomAdminlogin from '../component/admincomp/login';
import ProtectedRoute from '../component/admincomp/protectedrote';
const EcomApp = () => {
  return (
   
      <Routes>
        {/* Public E-commerce routes */}
        <Route path="/*" element={<Ecom_route />} />

        {/* Admin Routes - Only accessible if logged in as an admin */}
        <Route path="/admin/*" element={<ProtectedRoute element={<AdminEcom_route/>} />} />

        {/* Login route */}
        <Route exact path='/admin/login' element={<EcomAdminlogin />}/>

        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>

  );
};

export default EcomApp;
