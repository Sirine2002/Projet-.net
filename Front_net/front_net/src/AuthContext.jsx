import React, { createContext, useContext, useState } from 'react';

// Créer un contexte pour l'authentification
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // initialisez avec null (aucun utilisateur connecté)

    // Fonction pour connecter un utilisateur (peut inclure le rôle de l'utilisateur)
    const login = (userData) => {
        setUser(userData);  // Exemple : { username: "admin", role: "admin" }
    };

    // Fonction pour déconnecter l'utilisateur
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};