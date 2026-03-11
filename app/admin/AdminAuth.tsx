'use client';

import { useState } from 'react';

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'hexaverse@2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

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
            className="w-full bg-[var(--color-primary-500)] text-white font-bold py-3 rounded-lg hover:bg-[var(--color-primary-600)] transition-colors"
          >
            Access Control Panel
          </button>
        </form>
      </div>
    </div>
  );
}
