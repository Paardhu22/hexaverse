'use client';

import { useState, useEffect } from 'react';

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('hexa_admin_session_v2');
    if (session === 'hexa_authenticated_v2_2026') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'NIAT@HEXAVERSE@2026!@#') {
      localStorage.setItem('hexa_admin_session_v2', 'hexa_authenticated_v2_2026');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary-400)]"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="glass-card p-8 max-w-md w-full relative overflow-hidden">
        {/* Logo Emblem */}
        <div className="flex justify-center mb-8">
           <div className="relative w-24 h-24 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden p-2">
             <img 
               src="/logos/Hexaverse_Logo-removebg-preview.png" 
               alt="Hexaverse Logo" 
               className="w-full h-full object-contain filter brightness-110" 
             />
           </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter Access Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary-400)] transition-colors"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-400)] text-white font-black py-4 rounded-2xl hover:brightness-110 transition-all active:scale-95 uppercase tracking-widest shadow-[0_0_20px_rgba(0,195,255,0.2)]"
          >
            Access Control Panel
          </button>
        </form>
      </div>
    </div>
  );
}
