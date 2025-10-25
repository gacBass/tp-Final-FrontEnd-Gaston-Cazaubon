import { useState, useCallback } from 'react';

const BASE_URL = import.meta.env.VITE_EQUIPO_MEDICO_API_URL;
const LOGIN_API_URL = `${BASE_URL}/doctor/login`; 
const LOGOUT_API_URL = `${BASE_URL}/doctor/logout`;

const useLogin = () => {
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * @param {object} credentials 
     */
    const login = useCallback(async ({ email, password }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(LOGIN_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed due to network or server error.');
            }

            setUser(data.user);
            
            return data; 

        } catch (err) {
            setError(err.message);
            setUser(null);
            setToken(null);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [LOGIN_API_URL]); 


    const logout = useCallback(async () => {
        // 1. Clear local state immediately for a fast UI update
        setUser(null); 
        setError(null);
        setLoading(true);

        try {
            // 2. Call backend to clear HttpOnly cookie
            const response = await fetch(LOGOUT_API_URL, {
                method: 'POST',
                credentials: 'include', 
            });

            if (!response.ok) {
                // Log failure, but continue, as the local state is already cleared
                console.error('Backend failed to clear cookie:', response.status);
            }
            
        } catch (err) {
            // Log network error
            console.error('Logout request failed:', err);
        } finally {
            setLoading(false);
            // 💡 No navigation or global context reset here. 
            // The component calling this hook handles setAuthStatus(false) and navigate('/login').
        }
    }, [LOGOUT_API_URL]);

    return {
        user,
        token,
        loading,
        error,
        isLoggedIn: !!user,
        login,
        logout 
    };
};

export default useLogin;