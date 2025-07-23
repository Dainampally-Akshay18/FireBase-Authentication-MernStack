import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get authentication state from context
  const { user, logout, loading } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showLogoutModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLogoutModal]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setShowLogoutModal(false);
    setIsMobileMenuOpen(false);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.displayName || user.name || user.email?.split('@')[0] || 'User';
  };

  return (
    <>
      {/* Logout Confirmation Modal - HIGHEST Z-INDEX */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div 
            className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full border border-slate-600/50 shadow-2xl transform scale-100 animate-fadeIn relative z-[10000]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Logout</h3>
              <p className="text-slate-300 mb-6">Are you sure you want to sign out of DevForge?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop blur overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[8000] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-[7000] transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/40 shadow-xl shadow-slate-900/20' 
          : 'bg-slate-900/90 backdrop-blur-md'
      }`}>
        {/* Premium Top Border Gradient */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-xl opacity-60 blur-lg animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                  DevForge
                </h1>
                <span className="text-xs text-slate-400 font-medium -mt-1 hidden sm:block">
                  Developer Tools & Resources
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              
              {user ? (
                // Authenticated User UI
                <>
                  {/* User Profile Section */}
                  <div className="flex items-center space-x-3 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className="w-8 h-8 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <span className="text-slate-900 font-bold text-sm">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">Welcome back!</span>
                      <span className="text-slate-400 text-xs">{getUserDisplayName()}</span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    disabled={loading}
                    className="group relative px-6 py-2.5 font-semibold text-sm transition-all duration-300 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {loading ? 'Signing out...' : 'Sign Out'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </>
              ) : (
                // Unauthenticated User UI
                <>
                  {/* Login Button */}
                  <Link
                    to="/login"
                    className={`group relative px-6 py-2.5 font-semibold text-sm transition-all duration-300 rounded-xl border ${
                      isActive('/login')
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                        : 'text-slate-300 border-slate-600/50 hover:text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/30'
                    }`}
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isActive('/login') && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                    )}
                  </Link>

                  {/* Get Started Button */}
                  <Link
                    to="/signup"
                    className={`group relative px-6 py-2.5 font-semibold text-sm transition-all duration-300 rounded-xl overflow-hidden ${
                      isActive('/signup')
                        ? 'text-white bg-gradient-to-r from-emerald-500 to-cyan-600 shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-400/20'
                        : 'text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40'
                    }`}
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Get Started
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-600 blur opacity-75 group-hover:blur-lg transition-all duration-300"></div>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/40 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              
              {user ? (
                // Authenticated Mobile UI
                <>
                  {/* Mobile User Profile */}
                  <div className="flex items-center space-x-3 px-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600/50">
                    <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <span className="text-slate-900 font-bold">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Welcome back!</span>
                      <span className="text-slate-400 text-sm">{getUserDisplayName()}</span>
                    </div>
                  </div>

                  {/* Mobile Logout Button */}
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    disabled={loading}
                    className="group flex items-center justify-between w-full px-4 py-3 text-left font-semibold transition-all duration-300 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/5 hover:border-red-400/50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {loading ? 'Signing out...' : 'Sign Out'}
                    </div>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              ) : (
                // Unauthenticated Mobile UI
                <>
                  {/* Mobile Login Button */}
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center justify-between w-full px-4 py-3 text-left font-semibold transition-all duration-300 rounded-xl border ${
                      isActive('/login')
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                        : 'text-slate-300 border-slate-600/50 hover:text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </div>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* Mobile Get Started Button */}
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center justify-between w-full px-4 py-3 text-left font-semibold transition-all duration-300 rounded-xl text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 relative overflow-hidden ${
                      isActive('/signup') ? 'ring-2 ring-emerald-400/30' : ''
                    }`}
                  >
                    <div className="flex items-center relative z-10">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Get Started
                    </div>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                </>
              )}

              {/* Mobile Menu Decoration */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                    {user ? 'Authenticated' : 'Secure & Trusted'}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" style={{animationDelay: '500ms'}}></div>
                    Lightning Fast
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20"></div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
