// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 💡 Import the hook

const ProtectedRoute = ({ children }) => {
    // Check is synchronous now, thanks to AuthProvider handling initial load state
    const { isAuthenticated } = useAuth(); 

    if (!isAuthenticated) {
        // If not authenticated, redirect
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render content
    return children ? children : <Outlet />;
};

export default ProtectedRoute;