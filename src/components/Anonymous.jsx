import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

const Anonymous = () => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    return (
      <>
        <Login />
        <Register />
      </>
    );
  }

  return <Navigate to="/notes" />;
};

export default Anonymous;
