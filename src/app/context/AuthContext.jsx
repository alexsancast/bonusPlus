'use client'

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // Crear el contexto

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para la autenticación

    const login = () => setIsAuthenticated(true); // Función para iniciar sesión
    const logout = () => setIsAuthenticated(false); // Función para cerrar sesión

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}