// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// 💡 Assuming this is the path to your secure API-calling hook
import useAuthCheck from '../hooks/useAuthCheck'; 

const AuthContext = createContext(null); 

// 1. Hook to consume the context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// 2. The Provider component
export const AuthProvider = ({ children }) => {
    // 💡 The useAuthCheck hook MUST be updated to expose setIsAuthenticated
    const { isAuthenticated, isLoading, setIsAuthenticated } = useAuthCheck(); 

    // Function to allow LoginPage to set the status immediately after successful login
    const setAuthStatus = (status) => {
        setIsAuthenticated(status);
    };

    const auth = { isAuthenticated, isLoading, setAuthStatus };

    return (
        <AuthContext.Provider value={auth}>
            {/* Critical: Wait for the initial authentication check to complete */}
            {isLoading ? <div>Verificando sesión...</div> : children}
        </AuthContext.Provider>
    );
};