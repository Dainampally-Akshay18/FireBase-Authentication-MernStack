import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import api from '../utils/api';
import { auth, googleProvider } from '../firebase/firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            const response = await api.post('/users/login', { idToken });
            console.log(response.data);
            navigate('/');
        } catch (err) {
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
            const userCredential = await signInWithPopup(auth, googleProvider);
            const idToken = await userCredential.user.getIdToken();
            const response = await api.post('/users/google-signin', { idToken });
            console.log(response.data);
            navigate('/');
        } catch (err) {
            setError('Google Sign-In failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const EyeIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );

    const EyeSlashIcon = () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l4.242 4.242m0 0L15.536 15.536M14.12 14.12L15.536 15.536m-4.242-4.242L8.464 8.464" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
            {/* Background Pattern */}
            <div 
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-16 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1000ms'}}></div>
            <div className="absolute top-1/3 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '500ms'}}></div>

            {/* Main Container */}
            <div className="relative w-full max-w-md">
                {/* Glass Card */}
                <div className="backdrop-blur-xl bg-white bg-opacity-80 border border-white border-opacity-20 rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white from-opacity-10 to-transparent pointer-events-none"></div>
                    
                    {/* Header */}
                    <div className="relative z-10 text-center mb-8">
                        {/* Logo/Icon */}
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 text-sm font-medium">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="relative z-10 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleEmailLogin} className="relative z-10 space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    required
                                    disabled={loading}
                                    className={`w-full px-4 py-3 bg-white bg-opacity-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        emailFocused ? 'border-blue-500 bg-white bg-opacity-80 shadow-lg' : 'border-gray-200'
                                    }`}
                                    placeholder="Enter your email"
                                />
                                <div 
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 origin-left"
                                    style={{
                                        transform: emailFocused ? 'scaleX(1)' : 'scaleX(0)'
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    required
                                    disabled={loading}
                                    className={`w-full px-4 py-3 pr-12 bg-white bg-opacity-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        passwordFocused ? 'border-blue-500 bg-white bg-opacity-80 shadow-lg' : 'border-gray-200'
                                    }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                                <div 
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 origin-left"
                                    style={{
                                        transform: passwordFocused ? 'scaleX(1)' : 'scaleX(0)'
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Forgot your password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            style={{
                                transform: loading ? 'scale(1)' : undefined
                            }}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin mr-3"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative z-10 my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white bg-opacity-80 text-gray-500 font-medium">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="relative z-10 w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 border border-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
                        style={{
                            transform: loading ? 'scale(1)' : undefined
                        }}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-3"></div>
                                Processing...
                            </div>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </button>

                    {/* Sign Up Link */}
                    <div className="relative z-10 text-center mt-8">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <a 
                                href="/signup" 
                                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors hover:underline"
                            >
                                Create Account
                            </a>
                        </p>
                    </div>
                </div>

                {/* Bottom Glow Effect */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-gradient-to-r from-blue-400 from-opacity-20 to-indigo-400 to-opacity-20 blur-xl"></div>
            </div>
        </div>
    );
}

export default Login;
