import prisma from "@/lib/prisma";
import { Trophy, Medal } from "lucide-react";

export default async function LeaderboardPage() {
  const leaderboards = await prisma.leaderboard.findMany({
    orderBy: { points: 'desc' }
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black italic mb-2 tracking-wide text-white glow-text text-center md:text-left">
          TOURNAMENT <span className="text-[var(--color-primary-400)]">STANDINGS</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg text-center md:text-left">Live updates on points, gold, and silver medals won by each team.</p>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-white/10">
                  <th className="py-5 px-6 font-bold text-gray-300 uppercase tracking-widest text-sm">Rank</th>
                  <th className="py-5 px-6 font-bold text-gray-300 uppercase tracking-widest text-sm">Team</th>
                  <th className="py-5 px-6 font-bold text-gray-300 uppercase tracking-widest text-sm text-center">Gold</th>
                  <th className="py-5 px-6 font-bold text-gray-300 uppercase tracking-widest text-sm text-center">Silver</th>
                  <th className="py-5 px-6 font-bold text-[var(--color-primary-400)] uppercase tracking-widest text-sm text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leaderboards.map((entry, idx) => (
                  <tr key={entry.id} className="transition-colors hover:bg-white/5 group">
                    <td className="py-6 px-6 font-black text-2xl">
                      {idx === 0 ? <span className="text-yellow-400 inline-flex items-center gap-2 glow-text"><Trophy className="w-6 h-6" /> 1</span> : 
                       idx === 1 ? <span className="text-gray-300 inline-flex items-center gap-2"><Medal className="w-6 h-6" /> 2</span> : 
                       idx === 2 ? <span className="text-orange-400 inline-flex items-center gap-2"><Medal className="w-6 h-6" /> 3</span> : 
                       <span className="text-gray-600 pl-8">{idx + 1}</span>}
                    </td>
                    <td className="py-6 px-6 font-bold text-xl text-white group-hover:text-[var(--color-primary-400)] transition-colors">{entry.team}</td>
                    <td className="py-6 px-6 font-bold text-yellow-500 text-center text-xl bg-yellow-500/5">{entry.gold}</td>
                    <td className="py-6 px-6 font-bold text-gray-400 text-center text-xl bg-gray-500/5">{entry.silver}</td>
                    <td className="py-6 px-6 font-black text-[var(--color-primary-400)] text-right text-3xl bg-[var(--color-primary-400)]/5">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
