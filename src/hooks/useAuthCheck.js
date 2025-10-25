// src/hooks/useAuthCheck.js

import { useState, useEffect } from 'react';
const VERIFY_URL = "/api/auth/verify-session";

const useAuthCheck = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await fetch(VERIFY_URL, { 
                    method: 'GET',
                    credentials: 'include' 
                });

                // Read the response content regardless of a 200 status
                const data = await response.json();

                // 💡 FRONTEND FIX: Check if the response is 200 AND contains expected user data.
                // We assume if the user object or ID is present, the session is valid.
                if (response.ok && data.user && data.user.id) {
                    console.log("AUTH CHECK: Success based on 200 OK + User Data.");
                    setIsAuthenticated(true);
                } else {
                    // This handles non-2xx status codes OR a 200 status that returned no user data.
                    console.log("AUTH CHECK: Failed. Status:", response.status, "Data:", data);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                // Network error, server down, or JSON parsing error
                console.error("Auth verification failed:", error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []); 

    return { isAuthenticated, isLoading, setIsAuthenticated };
};

export default useAuthCheck;