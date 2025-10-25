import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLoginApi.js';
import '../../styles/login.css';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const { login, loading, error } = useLogin();
    const { setAuthStatus } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState(null);

    // Prioritize local error, then hook error
    const currentError = localError || error;

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLocalError(null); // Clear previous local errors

        if (!email || !password) {
            setLocalError("Por favor, introduce el email y la contraseña.");
            return;
        }

        try {
            // 1. Attempt login. If successful (200 OK), the promise resolves.
            await login({ email, password });
            setAuthStatus(true);
            // 2. If the promise resolves, navigate away.
            navigate('/adminPage'); 
            
        } catch (err) {
            // 3. If login fails (401, 403, 500, or network error), the hook throws.
            console.error("Login attempt failed:", err.message);
            setLocalError(err.message || "Error al conectar con el servidor.");
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>

            {currentError && <p className="error-message" style={{ color: 'red' }}>Error: {currentError}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'INICIANDO SESIÓN...' : 'LOGIN'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;