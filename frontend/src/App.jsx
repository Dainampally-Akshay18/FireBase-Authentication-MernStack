import { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
    const { user, loading } = useContext(AuthContext);

    return (
        <div>
            <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
                {loading ? (
                    <span>Loading...</span>
                ) : user ? (
                    <>
                        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
                        <Link to="/login" onClick={() => user.logout()} style={{ margin: '0 10px' }}>
                            Log Out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/signup" style={{ margin: '0 10px' }}>Sign Up</Link>
                        <Link to="/login" style={{ margin: '0 10px' }}>Log In</Link>
                    </>
                )}
            </nav>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;