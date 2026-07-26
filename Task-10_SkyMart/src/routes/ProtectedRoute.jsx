import React from 'react'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
    const token = localStorage.getItem("loggedInUser");
  return (
    <div>
        {token ? <Outlet/> : <Navigate to="/auth/login"/>}
    </div>
  )
}

export default ProtectedRoute