import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './context/AuthContext'; // 💡 Import AuthProvider

// Assuming your file is main.jsx, you need to import React 
// and ReactDOM/createRoot from their respective packages.

// 1. Get the root element
const rootElement = document.getElementById('root');

// 2. Render the application once, wrapped in AuthProvider
createRoot(rootElement).render(
  <StrictMode>
    {/* 💡 AuthProvider must wrap the entire RouterProvider */}
    <AuthProvider> 
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);