import { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './pages/Navbar';

function App() {
    const { user, loading } = useContext(AuthContext);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;