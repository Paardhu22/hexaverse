"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Home, CalendarDays, Users, ShieldAlert, Medal, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5 md:w-4 md:h-4" /> },
    { name: "Fixtures", href: "/fixtures", icon: <CalendarDays className="w-5 h-5 md:w-4 md:h-4" /> },
    { name: "Teams", href: "/teams", icon: <Users className="w-5 h-5 md:w-4 md:h-4" /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <Trophy className="w-5 h-5 md:w-4 md:h-4" /> },
    { name: "Hall of Fame", href: "/hall-of-fame", icon: <Medal className="w-5 h-5 md:w-4 md:h-4" /> },
    { name: "Admin", href: "/admin", icon: <ShieldAlert className="w-5 h-5 md:w-4 md:h-4" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden transition-transform hover:scale-105 active:scale-95">
                <img 
                  src="/logos/Hexaverse_Logo-removebg-preview.png" 
                  alt="Hexaverse" 
                  className="w-[85%] h-[85%] object-contain filter brightness-110" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] via-white to-[var(--color-purple-500)] drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                  HEXAVERSE
                </span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[var(--color-primary-500)] leading-none text-right">
                  Series 2.0
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1 lg:space-x-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10 shrink-0"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-white/5 active:scale-95 transition-all border border-white/10"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6 text-[var(--color-primary-400)]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden absolute w-full left-0 transition-all duration-300 ease-in-out bg-black/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl ${
          isOpen ? "top-20 opacity-100 max-h-[100vh]" : "top-10 opacity-0 max-h-0 overflow-hidden pointer-events-none"
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-black text-gray-300 hover:text-white hover:bg-[var(--color-primary-400)]/20 hover:border-[var(--color-primary-400)]/30 border border-transparent transition-all active:scale-[0.98]"
            >
              <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-[var(--color-primary-400)]">
                {link.icon}
              </div>
              {link.name}
            </Link>
          ))}
          
          <div className="mt-8 pt-6 border-t border-white/5 text-center px-4">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em]">
              The Ultimate College Sports Experience
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
