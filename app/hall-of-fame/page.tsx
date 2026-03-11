import prisma from "@/lib/prisma";
import { History, Star, Medal, Trophy } from "lucide-react";

export default async function HallOfFamePage() {
  const pastWinners = await prisma.hallOfFame.findMany({
    orderBy: { year: 'desc' }
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary-400)]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-purple-500)]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black italic mb-2 tracking-wide text-white glow-text text-center md:text-left">
          HALL OF <span className="text-yellow-400">FAME</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
          <History className="w-5 h-5" /> Celebrating eternal legends of HEXAVERSE.
        </p>

        {/* 2025 Champion Spotlight */}
        <div className="mb-24 relative group">
          <div className="glass-card overflow-hidden border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10">
            <div className="absolute top-0 right-0 p-8 pt-12 opacity-5 select-none pointer-events-none">
              <h2 className="text-[12rem] font-black italic text-white tracking-widest leading-none">2025</h2>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
              <div className="relative">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center p-6 shadow-2xl">
                  <img 
                    src="/logos/Vajra_Logo-removebg-preview.png" 
                    alt="VAJRA" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] brightness-110 contrast-125" 
                  />
                </div>
              </div>

              {/* Champion Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-black tracking-widest uppercase text-sm mb-6">
                  <Star className="w-4 h-4 fill-current" />
                  Official 2025 Champion
                  <Star className="w-4 h-4 fill-current" />
                </div>
                
                <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter mb-4 leading-none">
                  TEAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">VAJRA</span>
                </h2>
                
                <p className="text-2xl text-gray-300 italic max-w-xl font-medium">
                  "Striking with the force and precision of thunder. The undisputed kings of the 2025 Hexaverse season."
                </p>
              </div>
            </div>
            
            {/* Bottom Accent Bar */}
            <div className="h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Timeline removed per user request - Spotlight is now the primary focus */}
      </div>
    </div>
  );
}
