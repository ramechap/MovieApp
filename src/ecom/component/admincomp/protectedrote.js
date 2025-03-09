// src/component/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  // Assume that you are storing admin status in localStorage (or use any global state like Context/Redux)
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // You can check your login status or role here.

  // If the user is not an admin, redirect to the home page (or login page)
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the user is an admin, render the element (the protected route)
  return element;
};

export default ProtectedRoute;
