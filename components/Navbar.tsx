
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSignOut }) => {
  const location = useLocation();

  const isLanding = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white italic">FV</div>
              <span className="text-xl font-bold tracking-tight text-white">FastVision</span>
            </Link>
            
            {user && (
              <div className="hidden md:flex ml-10 space-x-6">
                <Link to="/dashboard" className={`text-sm ${location.pathname === '/dashboard' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>Dashboard</Link>
                <Link to="/train" className={`text-sm ${location.pathname === '/train' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>LoRA Train</Link>
                <Link to="/generate" className={`text-sm ${location.pathname === '/generate' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>Video Gen</Link>
                <Link to="/api" className={`text-sm ${location.pathname === '/api' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>API</Link>
              </div>
            )}
            
            {!user && (
              <div className="hidden md:flex ml-10 space-x-6">
                <a href="#product" className="text-sm text-slate-300 hover:text-white">Product</a>
                <a href="#pricing" className="text-sm text-slate-300 hover:text-white">Pricing</a>
                <a href="#docs" className="text-sm text-slate-300 hover:text-white">Docs</a>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center bg-slate-800/50 rounded-full px-3 py-1 text-xs text-indigo-300 border border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                  {user.credits} Credits
                </div>
                <Link to="/billing" className="p-1 rounded-full hover:bg-slate-800 transition-colors">
                   <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                   </svg>
                </Link>
                <button 
                  onClick={onSignOut}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-sm text-slate-300 hover:text-white">Sign In</Link>
                <Link to="/signin" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
