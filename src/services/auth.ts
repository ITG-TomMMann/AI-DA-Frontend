// src/services/auth.ts

export interface User {
    username: string;
    token: string;
  }
  
  export const AuthService = {
    // Get the current user from localStorage
    getCurrentUser: (): User | null => {
      const token = localStorage.getItem('authToken');
      const username = localStorage.getItem('username');
      
      if (token && username) {
        return { username, token };
      }
      
      return null;
    },
    
    // Check if the user is authenticated
    isAuthenticated: (): boolean => {
      return localStorage.getItem('authToken') !== null;
    },
    
    // Check if the token is expired
    isTokenExpired: (token: string): boolean => {
      try {
        // JWT tokens consist of three parts separated by dots
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        
        const { exp } = JSON.parse(jsonPayload);
        
        // If the expiration time is less than the current time, the token is expired
        return exp < Date.now() / 1000;
      } catch (err) {
        // If there's an error parsing the token, assume it's expired
        return true;
      }
    },
    
    // Set authentication data
    setAuth: (token: string, username: string): void => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
    },
    
    // Clear authentication data
    clearAuth: (): void => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
    }
  };