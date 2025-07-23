import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
    const { user, loading, error, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentTip, setCurrentTip] = useState(0);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Rotating tips for developers
    const devTips = [
        "Master data structures - they're the foundation of efficient algorithms",
        "Practice daily coding - consistency beats intensity in skill development",
        "Read other people's code - it's the fastest way to learn new patterns",
        "Write clean, readable code - your future self will thank you",
        "Learn system design - understanding scalability is crucial for senior roles"
    ];

    // Top DSA Problems for practice
    const dsaProblems = [
        { name: "Two Sum", difficulty: "Easy", topic: "Array", time: "O(n)" },
        { name: "Longest Substring", difficulty: "Medium", topic: "String", time: "O(n)" },
        { name: "Merge Intervals", difficulty: "Medium", topic: "Array", time: "O(n log n)" },
        { name: "Binary Tree Traversal", difficulty: "Medium", topic: "Tree", time: "O(n)" },
        { name: "LRU Cache", difficulty: "Hard", topic: "Design", time: "O(1)" },
        { name: "Word Ladder", difficulty: "Hard", topic: "Graph", time: "O(M²×N)" }
    ];

    // Industry growth stats
    const industryStats = [
        { metric: "Software Developer Growth", value: "22%", period: "2020-2030", icon: "📈" },
        { metric: "Average Salary Increase", value: "15%", period: "Yearly", icon: "💰" },
        { metric: "Remote Job Opportunities", value: "300%", period: "Since 2020", icon: "🌍" },
        { metric: "AI/ML Job Demand", value: "40%", period: "Year over Year", icon: "🤖" }
    ];

    // Tech skills in demand
    const techSkills = [
        { skill: "React/Next.js", demand: 95, category: "Frontend" },
        { skill: "Node.js", demand: 88, category: "Backend" },
        { skill: "Python", demand: 92, category: "Data Science" },
        { skill: "AWS/Cloud", demand: 96, category: "DevOps" },
        { skill: "TypeScript", demand: 89, category: "Language" },
        { skill: "Docker/K8s", demand: 85, category: "DevOps" }
    ];

    useEffect(() => {
        const tipInterval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % devTips.length);
        }, 5000);

        return () => clearInterval(tipInterval);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg font-medium">Loading your developer dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-400 bg-green-500/10';
            case 'Medium': return 'text-yellow-400 bg-yellow-500/10';
            case 'Hard': return 'text-red-400 bg-red-500/10';
            default: return 'text-gray-400 bg-gray-500/10';
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(false);
        logout();
    };

    return (
        <>
            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Confirm Logout</h3>
                        <p className="text-slate-300 mb-6">Are you sure you want to log out of DevForge?</p>
                        <div className="flex space-x-3">
                            
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-8 pb-16">
                        {/* Header with User Info */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                            <div className="mb-4 md:mb-0">
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                    Welcome to DevForge
                                </h1>
                                <p className="text-xl text-slate-300">
                                    Hello, <span className="text-emerald-400 font-semibold">{user.name || user.email}</span>! 
                                    Ready to forge your development skills?
                                </p>
                            </div>
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="px-6 py-3 bg-red-600/80 hover:bg-red-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>

                        {/* Daily Developer Tip */}
                        <div className="mb-12 p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                    💡
                                </div>
                                <h2 className="text-xl font-bold text-emerald-400">Daily Developer Tip</h2>
                            </div>
                            <p className="text-lg text-slate-200 leading-relaxed">{devTips[currentTip]}</p>
                            <div className="flex space-x-1 mt-4">
                                {devTips.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentTip ? 'bg-emerald-400' : 'bg-slate-600'
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Industry Growth Stats */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                IT Industry Growth 📊
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {industryStats.map((stat, index) => (
                                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 transform hover:scale-105">
                                        <div className="text-3xl mb-3">{stat.icon}</div>
                                        <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                                        <div className="text-white font-semibold mb-1">{stat.metric}</div>
                                        <div className="text-slate-400 text-sm">{stat.period}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top DSA Problems */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Top DSA Problems to Master 🧠
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {dsaProblems.map((problem, index) => (
                                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xl font-bold text-white">{problem.name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                                                {problem.difficulty}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-slate-300">
                                            <span className="bg-slate-700 px-3 py-1 rounded-lg text-sm">{problem.topic}</span>
                                            <span className="text-emerald-400 font-mono text-sm">{problem.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* In-Demand Tech Skills */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Most In-Demand Tech Skills 🔥
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {techSkills.map((tech, index) => (
                                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-white">{tech.skill}</h3>
                                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-lg text-xs font-semibold">
                                                {tech.category}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-slate-300">Market Demand</span>
                                                <span className="text-yellow-400 font-semibold">{tech.demand}%</span>
                                            </div>
                                            <div className="w-full bg-slate-700 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                                                    style={{ width: `${tech.demand}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Career Growth Tips */}
                        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-indigo-500/20">
                            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                Career Growth Strategies 🚀
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                                        📚
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-indigo-400">Continuous Learning</h3>
                                    <p className="text-slate-300">Stay updated with latest technologies, frameworks, and industry trends through courses and documentation.</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                                        🤝
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-purple-400">Network Building</h3>
                                    <p className="text-slate-300">Connect with other developers, attend tech meetups, and contribute to open-source projects.</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                                        💼
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-pink-400">Portfolio Building</h3>
                                    <p className="text-slate-300">Create impressive projects showcasing your skills and deploy them for potential employers to see.</p>
                                </div>
                            </div>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                                <p className="text-red-400 font-medium">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
