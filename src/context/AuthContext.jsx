import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockUsers';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize user from localStorage if exists
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('currentUser');
        return saved ? JSON.parse(saved) : null;
    });

    const [users, setUsers] = useState(USERS);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const login = (email, password) => {
        setAuthError(null);
        const user = users.find(u => u.email === email);

        if (!user) {
            setAuthError('Account not exist');
            return false;
        }

        if (user.password !== password) {
            setAuthError('Invalid Password');
            return false;
        }

        setCurrentUser(user);
        return true;
    };

    const signup = (name, email, password) => {
        setAuthError(null);

        if (users.some(u => u.email === email)) {
            setAuthError('Email already exists');
            return false;
        }

        const newUser = {
            id: `u${Date.now()}`,
            name,
            email,
            password,
            role: 'Portal User', // Default role for new signups
            company: 'GearGuard Inc.'
        };

        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser); // Auto login after signup
        return true;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    // For debugging/demo purposes, we expose users list manipulation
    // In a real app, this would be API calls

    const value = {
        currentUser,
        login,
        signup,
        logout,
        authError,
        setAuthError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
