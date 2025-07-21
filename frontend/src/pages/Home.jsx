import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { user, loading, error, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="container">
            <h2>Hello, {user.name}!</h2>
            <p>Welcome to the protected page! You are logged in.</p>
            {error && <p className="error">{error}</p>}
            <button onClick={logout} style={{ backgroundColor: '#d32f2f', marginTop: '15px' }}>
                Log Out
            </button>
        </div>
    );
}

export default Home;