import axios from 'axios';

// L'URL de votre API
const API_URL = 'https://localhost:7220/api/Account'; // Vous pouvez remplacer avec l'URL de votre API si nécessaire

// Fonction de connexion
export const login = async (credentials) => {
    try {
        // Envoi des informations d'identification pour obtenir le token et le rôle
        const response = await axios.post(`${API_URL}/login`, credentials);
        
        // Renvoie l'objet contenant le token et le rôle
        return response.data; 
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Fonction d'enregistrement (si besoin)
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/Register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Fonction pour obtenir des données protégées
export const getProtectedData = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('https://localhost:7220/api/ProtectedRoute', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};