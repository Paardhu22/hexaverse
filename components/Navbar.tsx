import Link from "next/link";
import { Trophy, Home, CalendarDays, Users, ShieldAlert, Medal } from "lucide-react";

export default function Navbar() {
  const links = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Fixtures", href: "/fixtures", icon: <CalendarDays className="w-4 h-4" /> },
    { name: "Teams", href: "/teams", icon: <Users className="w-4 h-4" /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <Trophy className="w-4 h-4" /> },
    { name: "Hall of Fame", href: "/hall-of-fame", icon: <Medal className="w-4 h-4" /> },
    { name: "Admin", href: "/admin", icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden scale-90 sm:scale-100">
                <img 
                  src="/logos/Hexaverse_Logo-removebg-preview.png" 
                  alt="Hexaverse" 
                  className="w-full h-full object-contain filter brightness-110 p-1" 
                />
              </div>
              <span className="text-xl font-black italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-purple-500)] drop-shadow-[0_0_8px_rgba(0,240,255,0.3)] hidden sm:inline-block">
                HEXAVERSE
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--color-primary-400)]/20 text-[var(--color-primary-400)] border border-[var(--color-primary-400)]/30 hidden sm:block">
                2.0
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-[var(--color-primary-400)]/10 transition-colors"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            {/* Mobile menu button could go here, omitting for brevity or building later */}
          </div>
        </div>
      </div>
    </nav>
  );
}
