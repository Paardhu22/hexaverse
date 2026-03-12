"use client";

import { useState } from "react";
import { Users2, Target, Award, CalendarDays, ChevronDown, ChevronUp, MapPin, X } from "lucide-react";

interface Team {
  id: string;
  name: string;
  captain: string;
  description: string;
  wins: number;
  points: number;
  logo: string;
}

interface Match {
  id: string;
  sport: string;
  category: string;
  teamA: string;
  teamB: string;
  scoreA: string | null;
  scoreB: string | null;
  winner: string | null;
  status: string;
  time: Date;
  venue: string | null;
}

interface TeamsClientProps {
  teams: Team[];
  matches: Match[];
}

export default function TeamsClient({ teams, matches }: TeamsClientProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const getTeamMatches = (teamName: string) => {
    return matches.filter(m => m.teamA === teamName || m.teamB === teamName);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {teams.map((team) => {
        const isSelected = selectedTeam === team.name;
        const teamMatches = getTeamMatches(team.name);

        return (
          <div 
            key={team.id} 
            onClick={() => setSelectedTeam(isSelected ? null : team.name)}
            className={`glass-card overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-black/40 relative border border-white/5 hover:border-[var(--color-primary-400)]/30 ${
              isSelected ? "ring-2 ring-[var(--color-primary-400)] shadow-[0_0_50px_rgba(0,240,255,0.15)]" : ""
            }`}
          >
            {/* Background Effects */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_60%)] transition-opacity duration-700 pointer-events-none ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-bl from-[var(--color-primary-400)]/20 via-[var(--color-purple-500)]/10 to-transparent rounded-full transition-all duration-700 group-hover:scale-125 pointer-events-none blur-3xl"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/80 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-700 group-hover:border-[var(--color-primary-400)]/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-400)]/5 via-transparent to-[var(--color-purple-500)]/5 opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <img 
                      src={team.logo} 
                      alt={team.name} 
                      className="relative z-10 w-full h-full object-cover filter drop-shadow-[0_0_12px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-700 select-none" 
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white group-hover:text-[var(--color-primary-400)] transition-colors">{team.name}</h2>
                    <p className="text-gray-400 flex items-center gap-1 mt-1 text-sm font-bold uppercase tracking-widest">
                       Captain: <span className="text-white">{team.captain}</span>
                    </p>
                  </div>
                </div>
                <div className="text-[var(--color-primary-400)] animate-pulse hidden md:block">
                  {isSelected ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
              </div>
              
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{team.description}"</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{team.wins}</div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Wins</div>
                  </div>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <Award className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{team.points}</div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Total Points</div>
                  </div>
                </div>
              </div>

              {/* Game List Section */}
              <div className={`mt-8 space-y-4 overflow-hidden transition-all duration-500 ${isSelected ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-sm font-black text-[var(--color-primary-400)] uppercase tracking-[0.3em] mb-4">Scheduled Games</h3>
                  <div className="space-y-3">
                    {teamMatches.length > 0 ? teamMatches.map((m) => (
                      <div key={m.id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-2 hover:bg-white/10 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-[var(--color-purple-400)] uppercase tracking-wider">{m.category} • {m.sport}</span>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                            m.status === 'Finished' ? 'bg-gray-500/20 text-gray-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold">{m.teamA} <span className="text-gray-500 text-xs italic mx-1">VS</span> {m.teamB}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-bold">
                           <div className="flex items-center gap-1">
                             <CalendarDays className="w-3 h-3 text-[var(--color-primary-400)]" />
                             {new Date(m.time).toLocaleDateString()}
                           </div>
                           {m.venue && (
                             <div className="flex items-center gap-1">
                               <MapPin className="w-3 h-3 text-[var(--color-purple-500)]" />
                               {m.venue}
                             </div>
                           )}
                        </div>
                      </div>
                    )) : (
                      <p className="text-gray-500 text-sm italic">No games scheduled for this team yet.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center text-[10px] md:hidden font-black text-[var(--color-primary-400)] uppercase tracking-widest">
                 {isSelected ? "Click to Close" : "Click to view games"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
