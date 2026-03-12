import prisma from "@/lib/prisma";
import { Trophy, Medal } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  let leaderboards: any[] = [];
  try {
    leaderboards = await prisma.leaderboard.findMany({
      orderBy: { points: 'desc' }
    });
  } catch (error) {
    console.error("Database connection error on leaderboard page:", error);
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black italic mb-2 tracking-wide text-white glow-text text-center md:text-left">
          TOURNAMENT <span className="text-[var(--color-primary-400)]">STANDINGS</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg text-center md:text-left">Live updates on points, gold, and silver medals won by each team.</p>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[360px] sm:min-w-0">
              <thead>
                <tr className="bg-black/40 border-b border-white/10 text-[10px] sm:text-xs">
                  <th className="py-4 sm:py-5 px-3 sm:px-6 font-black text-gray-400 uppercase tracking-widest">Rank</th>
                  <th className="py-4 sm:py-5 px-3 sm:px-6 font-black text-gray-400 uppercase tracking-widest">Team</th>
                  <th className="py-4 sm:py-5 px-3 sm:px-6 font-black text-gray-400 uppercase tracking-widest text-center">Gold</th>
                  <th className="py-4 sm:py-5 px-3 sm:px-6 font-black text-gray-400 uppercase tracking-widest text-center">Silver</th>
                  <th className="py-4 sm:py-5 px-3 sm:px-6 font-black text-[var(--color-primary-400)] uppercase tracking-widest text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leaderboards.map((entry, idx) => (
                  <tr key={entry.id} className="transition-colors hover:bg-white/5 group">
                    <td className="py-4 sm:py-6 px-3 sm:px-6 font-black text-lg sm:text-2xl whitespace-nowrap">
                      {idx === 0 ? <span className="text-yellow-400 inline-flex items-center gap-1.5 sm:gap-2 glow-text"><Trophy className="w-4 h-4 sm:w-6 sm:h-6" /> 1</span> :
                        idx === 1 ? <span className="text-gray-300 inline-flex items-center gap-1.5 sm:gap-2"><Medal className="w-4 h-4 sm:w-6 sm:h-6" /> 2</span> :
                          idx === 2 ? <span className="text-orange-400 inline-flex items-center gap-1.5 sm:gap-2"><Medal className="w-4 h-4 sm:w-6 sm:h-6" /> 3</span> :
                            <span className="text-gray-600 pl-6 sm:pl-8">{idx + 1}</span>}
                    </td>
                    <td className="py-4 sm:py-6 px-3 sm:px-6 font-bold text-base sm:text-xl text-white group-hover:text-[var(--color-primary-400)] transition-colors whitespace-nowrap">{entry.team}</td>
                    <td className="py-4 sm:py-6 px-3 sm:px-6 font-bold text-yellow-500 text-center text-lg sm:text-xl bg-yellow-500/5">{entry.gold}</td>
                    <td className="py-4 sm:py-6 px-3 sm:px-6 font-bold text-gray-400 text-center text-lg sm:text-xl bg-gray-500/5">{entry.silver}</td>
                    <td className="py-4 sm:py-6 px-3 sm:px-6 font-black text-[var(--color-primary-400)] text-right text-2xl sm:text-3xl bg-[var(--color-primary-400)]/5">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Points System Rules */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-[var(--color-primary-400)]" />
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider italic">Points <span className="text-[var(--color-primary-400)]">System</span></h2>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs text-gray-400 font-black uppercase tracking-widest">
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6 text-center text-yellow-500">Gold Points</th>
                    <th className="py-4 px-6 text-center text-gray-400">Silver Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {/* Outdoor Section */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td rowSpan={2} className="py-8 px-6 font-black text-white bg-white/2 border-r border-white/5 italic">Outdoor</td>
                    <td className="py-4 px-6 text-gray-300 font-medium">Team Sport</td>
                    <td className="py-4 px-6 text-center font-black text-yellow-500 text-lg sm:text-xl">7 pts</td>
                    <td className="py-4 px-6 text-center font-black text-gray-400 text-lg sm:text-xl">5 pts</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-gray-300 font-medium border-l border-white/5">Single Sport</td>
                    <td className="py-4 px-6 text-center font-black text-yellow-500 text-lg sm:text-xl">5 pts</td>
                    <td className="py-4 px-6 text-center font-black text-gray-400 text-lg sm:text-xl">3 pts</td>
                  </tr>

                  {/* Indoor & Esports Section */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td rowSpan={2} className="py-8 px-6 font-black text-white bg-[var(--color-primary-400)]/5 border-r border-white/5 italic">Indoor & Esports</td>
                    <td className="py-4 px-6 text-gray-300 font-medium">Team Sport</td>
                    <td className="py-4 px-6 text-center font-black text-yellow-500 text-lg sm:text-xl">5 pts</td>
                    <td className="py-4 px-6 text-center font-black text-gray-400 text-lg sm:text-xl">3 pts</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-gray-300 font-medium border-l border-white/5">Single Sport</td>
                    <td className="py-4 px-6 text-center font-black text-yellow-500 text-lg sm:text-xl">3 pts</td>
                    <td className="py-4 px-6 text-center font-black text-gray-400 text-lg sm:text-xl">1 pt</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 italic">* Points are automatically calculated and added to the faction's total standings.</p>
        </div>
      </div>
    </div>
  );
}
