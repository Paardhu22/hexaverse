import prisma from "@/lib/prisma";
import { CalendarDays, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FixturesPage() {
  const matches = await prisma.match.findMany({
    orderBy: { time: 'asc' }
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black italic mb-2 tracking-wide text-white glow-text text-center md:text-left">
          MATCH <span className="text-[var(--color-primary-400)]">FIXTURES</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg text-center md:text-left">All schedules, live scores, and finished match results.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="glass-card flex flex-col justify-between overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black px-2 py-1 rounded bg-black/40 text-[var(--color-primary-400)] border border-[var(--color-primary-400)]/20 uppercase tracking-widest">{match.category} - {match.leagueFormat}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                    match.status === 'Live' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 
                    match.status === 'Finished' ? 'bg-gray-500/20 text-gray-400' : 
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {match.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-6 text-center tracking-wide">{match.sport}</h3>
                
                <div className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5 mb-6">
                  <div className={`flex flex-col items-center flex-1 ${match.winner === match.teamA ? 'text-[var(--color-primary-400)] glow-text' : 'text-gray-200'}`}>
                    <span className="text-xl font-black truncate">{match.teamA}</span>
                    {match.scoreA && <span className="text-3xl font-black mt-2">{match.scoreA}</span>}
                  </div>
                  
                  <div className="px-4 text-gray-500 font-bold italic">VS</div>
                  
                  <div className={`flex flex-col items-center flex-1 ${match.winner === match.teamB ? 'text-[var(--color-primary-400)] glow-text' : 'text-gray-200'}`}>
                    <span className="text-xl font-black truncate">{match.teamB}</span>
                    {match.scoreB && <span className="text-3xl font-black mt-2">{match.scoreB}</span>}
                  </div>
                </div>

                {match.winner && (
                  <div className="text-center mb-4">
                    <span className="text-sm font-bold bg-[var(--color-purple-500)]/20 text-[var(--color-purple-500)] px-3 py-1 rounded-full border border-[var(--color-purple-500)]/30 inline-flex items-center gap-2">
                       WINNER: {match.winner}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-white/5 p-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[var(--color-primary-400)]" />
                  {new Date(match.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {new Date(match.time).toLocaleDateString()}
                </div>
                {match.venue && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--color-purple-500)]" />
                    {match.venue}
                  </div>
                )}
              </div>
            </div>
          ))}
          {matches.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-12 glass-card">
               <p className="text-gray-400 text-lg">No fixtures available. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
