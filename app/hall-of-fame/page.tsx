import prisma from "@/lib/prisma";
import { History, Star, Medal } from "lucide-react";

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

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {pastWinners.map((winner, idx) => (
             <div key={winner.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active ${idx !== 0 ? 'opacity-80 hover:opacity-100 transition-opacity duration-300' : ''}`}>
               {/* Timeline Dot */}
               <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--background)] bg-yellow-500 text-black shadow z-10 md:mx-auto">
                 <Star className="w-5 h-5 fill-black" />
               </div>
               
               {/* Content Card */}
               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 relative">
                 <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                   <h2 className="text-8xl font-black italic text-white/50">{winner.year}</h2>
                 </div>
                 <div className="flex flex-col gap-4 relative z-10">
                   <div>
                     <span className="text-[var(--color-primary-400)] font-bold text-sm tracking-widest uppercase">Champion {winner.year}</span>
                     <h3 className="text-4xl font-black text-white glow-text italic tracking-wide mt-1 flex items-center gap-3">
                       <Medal className="w-8 h-8 text-yellow-400" />
                       {winner.winner}
                     </h3>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 mt-2">
                     <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                       <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">Runner-up</span>
                       <span className="text-lg font-bold text-gray-200">{winner.runnerUp}</span>
                     </div>
                     <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                       <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">Total Points</span>
                       <span className="text-lg font-bold text-[var(--color-primary-400)]">{winner.points} pts</span>
                     </div>
                   </div>

                   {winner.mvp && (
                     <div className="mt-2 bg-gradient-to-r from-purple-500/10 to-transparent p-3 rounded-lg border-l-2 border-purple-500 flex items-center gap-3 text-sm">
                       <span className="font-bold text-purple-400">Tournament MVP:</span>
                       <span className="text-white font-semibold">{winner.mvp}</span>
                     </div>
                   )}
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
