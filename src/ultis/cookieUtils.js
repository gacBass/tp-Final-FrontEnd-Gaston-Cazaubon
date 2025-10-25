// src/utils/cookieUtils.js

export const getCookie = (name) => {
    // Splits document.cookie into individual cookies
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        
        // Check if the cookie starts with the name we are looking for
        if (cookie.startsWith(name + '=')) {
            // Return the cookie value
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};