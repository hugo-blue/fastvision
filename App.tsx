
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import TrainingPage from './pages/TrainingPage';
import GenerationPage from './pages/GenerationPage';
import APIPage from './pages/APIPage';
import BillingPage from './pages/BillingPage';
import SignIn from './pages/SignIn';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate persistent auth check
    const mockUser: User = {
      id: 'usr_123',
      email: 'creator@fastvision.ai',
      name: 'Visionary Creator',
      credits: 500,
      subscription: 'PRO',
      hasPaymentMethod: true
    };
    const storedUser = localStorage.getItem('fv_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleSignIn = () => {
    const mockUser: User = {
      id: 'usr_123',
      email: 'creator@fastvision.ai',
      name: 'Visionary Creator',
      credits: 500,
      subscription: 'PRO',
      hasPaymentMethod: true
    };
    setUser(mockUser);
    localStorage.setItem('fv_user', JSON.stringify(mockUser));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('fv_user');
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar user={user} onSignOut={handleSignOut} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage user={user} />} />
            <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <SignIn onSignIn={handleSignIn} />} />
            <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/signin" />} />
            <Route path="/train" element={user ? <TrainingPage user={user} /> : <Navigate to="/signin" />} />
            <Route path="/generate" element={user ? <GenerationPage user={user} /> : <Navigate to="/signin" />} />
            <Route path="/api" element={user ? <APIPage user={user} /> : <Navigate to="/signin" />} />
            <Route path="/billing" element={user ? <BillingPage user={user} /> : <Navigate to="/signin" />} />
          </Routes>
        </main>
        <footer className="bg-slate-900/50 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
          <p>© 2024 FastVision AI. Built for the future of video creation.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
