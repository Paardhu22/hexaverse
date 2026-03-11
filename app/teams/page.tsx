import prisma from "@/lib/prisma";
import { Users2, Target, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black italic mb-2 tracking-wide text-white glow-text text-center md:text-left">
          COMPETING <span className="text-[var(--color-primary-400)]">FACTIONS</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg text-center md:text-left">Explore the distinct teams fighting for the ultimate HEXAVERSE 2.0 championship.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((team) => (
            <div key={team.id} className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-black/40 lg:bg-transparent lg:hover:bg-white/5 relative border border-white/5 hover:border-white/10">
              {/* Subtle radial gradient background effect inside the card */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="p-8 relative z-10">
                {/* Decorative Glowing Accent blobs */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-bl from-[var(--color-primary-400)]/20 via-[var(--color-purple-500)]/10 to-transparent rounded-full transition-all duration-700 group-hover:scale-125 group-hover:translate-x-4 pointer-events-none blur-3xl"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 min-w-[6rem] rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,255,255,0.05),0_0_30px_rgba(0,0,0,0.9)] overflow-hidden group-hover:shadow-[0_0_35px_rgba(59,130,246,0.3)] group-hover:border-[var(--color-primary-400)]/40 transition-all duration-700">
                      {/* Inner ambient glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-400)]/5 via-transparent to-[var(--color-purple-500)]/5 opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>
                      
                      {team.logo.includes('.png') ? (
                        <img 
                          src={team.logo} 
                          alt={team.name} 
                          className="relative z-10 w-full h-full object-cover filter drop-shadow-[0_0_12px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700 select-none" 
                        />
                      ) : (
                        <span className="relative z-10 font-black">{team.logo}</span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-wider text-white group-hover:text-[var(--color-primary-400)] transition-colors">{team.name}</h2>
                      <p className="text-gray-400 flex items-center gap-1 mt-1 text-sm">
                        <Users2 className="w-4 h-4" /> Captain: {team.captain}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 italic mb-6">"{team.description}"</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{team.wins}</div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Wins</div>
                    </div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <Award className="w-6 h-6 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{team.points}</div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Points</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
