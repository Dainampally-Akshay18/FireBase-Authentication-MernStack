import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import api from '../utils/api';
import { auth } from '../firebase/firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [formProgress, setFormProgress] = useState(0);
    
    // Focus states for premium animations
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    
    const navigate = useNavigate();

    // Password strength calculation
    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength += 25;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    // Update form progress
    const updateFormProgress = () => {
        let progress = 0;
        if (name.trim()) progress += 33;
        if (email.trim()) progress += 33;
        if (password.length >= 6) progress += 34;
        setFormProgress(progress);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(calculatePasswordStrength(newPassword));
        updateFormProgress();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        updateFormProgress();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        updateFormProgress();
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await api.post('/users/signup', {
                email,
                password,
                name
            });

            navigate('/');
        } catch (err) {
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

    // Custom Icons
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

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 25) return 'bg-red-500';
        if (passwordStrength < 50) return 'bg-orange-500';
        if (passwordStrength < 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength < 25) return 'Weak';
        if (passwordStrength < 50) return 'Fair';
        if (passwordStrength < 75) return 'Good';
        return 'Strong';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
                <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '2s', animationDuration: '2s'}}></div>
            </div>

            {/* Main Container */}
            <div className="relative w-full max-w-md">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                        <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${formProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center font-medium">
                        {formProgress < 100 ? `${Math.round(formProgress)}% Complete` : 'Ready to Create Account!'}
                    </p>
                </div>

                {/* Glass Card */}
                <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-3xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-500/5 pointer-events-none"></div>
                    
                    {/* Header */}
                    <div className="relative z-10 text-center mb-8">
                        {/* Animated Logo */}
                        <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            {/* Pulsing Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl opacity-75 blur-lg animate-pulse"></div>
                        </div>
                        
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-600 text-sm font-medium">
                            Join thousands of professionals worldwide
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="relative z-10 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSignup} className="relative z-10 space-y-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    onFocus={() => setNameFocused(true)}
                                    onBlur={() => setNameFocused(false)}
                                    required
                                    disabled={loading}
                                    className={`w-full px-4 py-3 pl-11 bg-white/60 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        nameFocused ? 'border-blue-500 bg-white/80 shadow-lg shadow-blue-500/10' : 'border-gray-200'
                                    }`}
                                    placeholder="Enter your full name"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg className={`w-5 h-5 transition-colors duration-300 ${nameFocused ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div 
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 origin-left"
                                    style={{transform: nameFocused ? 'scaleX(1)' : 'scaleX(0)'}}
                                ></div>
                            </div>
                        </div>

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
                                    onChange={handleEmailChange}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    required
                                    disabled={loading}
                                    className={`w-full px-4 py-3 pl-11 bg-white/60 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        emailFocused ? 'border-blue-500 bg-white/80 shadow-lg shadow-blue-500/10' : 'border-gray-200'
                                    }`}
                                    placeholder="Enter your email address"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg className={`w-5 h-5 transition-colors duration-300 ${emailFocused ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <div 
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 origin-left"
                                    style={{transform: emailFocused ? 'scaleX(1)' : 'scaleX(0)'}}
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
                                    onChange={handlePasswordChange}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    required
                                    disabled={loading}
                                    className={`w-full px-4 py-3 pl-11 pr-12 bg-white/60 border-2 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed ${
                                        passwordFocused ? 'border-blue-500 bg-white/80 shadow-lg shadow-blue-500/10' : 'border-gray-200'
                                    }`}
                                    placeholder="Create a strong password"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg className={`w-5 h-5 transition-colors duration-300 ${passwordFocused ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                                <div 
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 origin-left"
                                    style={{transform: passwordFocused ? 'scaleX(1)' : 'scaleX(0)'}}
                                ></div>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-600">Password Strength</span>
                                        <span className={`text-xs font-bold ${passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'}`}>
                                            {getPasswordStrengthText()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                                            style={{ width: `${passwordStrength}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || formProgress < 100}
                            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl relative overflow-hidden"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                    Creating Your Account...
                                </div>
                            ) : (
                                <>
                                    <span className="relative z-10">Create Account</span>
                                    {/* Button Shimmer Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="relative z-10 text-center mt-8">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <a 
                                href="/login" 
                                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors hover:underline"
                            >
                                Sign In
                            </a>
                        </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="relative z-10 mt-8 pt-6 border-t border-gray-200/50">
                        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                 Encrypted
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Privacy Protected
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Glow */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 blur-xl"></div>
            </div>
        </div>
    );
}

export default Signup;
