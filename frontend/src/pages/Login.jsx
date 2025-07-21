import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import api from '../utils/api';
import { auth, googleProvider } from '../firebase/firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();

            // Verify with backend
            const response = await api.post('/users/login', { idToken });
            console.log(response.data); // Log user data for debugging

            // Navigate to home page
            navigate('/');
        } catch (err) {
            // Map Firebase errors to user-friendly messages
            const errorMessage = {
                'auth/user-not-found': 'No account found with this email.',
                'auth/wrong-password': 'Incorrect password. Please try again.',
                'auth/invalid-email': 'Please enter a valid email address.',
            }[err.code] || 'Login failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            // Sign in with Google
            const userCredential = await signInWithPopup(auth, googleProvider);
            const idToken = await userCredential.user.getIdToken();

            // Verify with backend
            const response = await api.post('/users/google-signin', { idToken });
            console.log(response.data); // Log user data for debugging

            // Navigate to home page
            navigate('/');
        } catch (err) {
            setError('Google Sign-In failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Log In</h2>
            {error && <p className="error">{error}</p>}
            {loading && <p className="loading">Logging in...</p>}
            <form onSubmit={handleEmailLogin}>
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
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
            </form>
            <button
                className="google-btn"
                onClick={handleGoogleSignIn}
                disabled={loading}
                style={{ marginTop: '15px' }}
            >
                {loading ? 'Processing...' : 'Sign in with Google'}
            </button>
            <p>
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
}

export default Login;