import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import api from '../utils/api';
import { auth } from '../firebase/firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send user data to backend
            await api.post('/users/signup', {
                email,
                password,
                name
            });

            // Navigate to home page on success
            navigate('/');
        } catch (err) {
            // Map Firebase errors to user-friendly messages
            const errorMessage = {
                'auth/email-already-in-use': 'This email is already registered.',
                'auth/invalid-email': 'Please enter a valid email address.',
                'auth/weak-password': 'Password must be at least 6 characters long.',
            }[err.code] || 'Signup failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Creating account...</p>}
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <p>
                Already have an account? <a href="/login">Log In</a>
            </p>
        </div>
    );
}

export default Signup;