import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            setError('');
            if (firebaseUser) {
                try {
                    // Fetch user data from backend
                    const response = await api.get('/users/profile');
                    setUser(response.data);
                } catch (err) {
                    setError('Failed to fetch user profile. Please log in again.');
                    setUser(null);
                    navigate('/login');
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [navigate]);

    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            setError('');
            navigate('/login');
        } catch (err) {
            setError('Failed to log out. Please try again.');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, logout }}>
            {children}
        </AuthContext.Provider>
    );
};