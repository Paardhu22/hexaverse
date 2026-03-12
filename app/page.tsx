import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowRight, Trophy, Users, ShieldAlert, Sparkles, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let matches: any[] = [];
  let stats = { teams: 0, sports: 0, matches: 0 };

  try {
    matches = await prisma.match.findMany({
      take: 3,
      orderBy: { time: 'asc' },
      where: { status: { in: ['Upcoming', 'Live'] } }
    });

    const totalTeams = await prisma.team.count();
    const distinctSports = await prisma.match.groupBy({ by: ['sport'] });

    stats = {
      teams: totalTeams,
      sports: distinctSports.length,
      matches: await prisma.match.count()
    };
  } catch (error) {
    console.error("Database connection error on home page:", error);
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary-400)]/10 via-transparent to-[var(--color-purple-500)]/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 text-white drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            HEXAVERSE <span className="inline-block pr-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-400)] to-[var(--color-purple-500)] drop-shadow-[0_0_15px_rgba(112,0,255,0.3)]">2.0</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Witness the clash of 4 factions: Agni, Samudra, Vajra, and Vayu. 3 Categories, 1 Champion.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link href="/fixtures" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-black uppercase tracking-widest text-white bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-400)] rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,195,255,0.4)] active:scale-95">
              <span className="relative z-10 flex items-center gap-2 italic">View Fixtures <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <Link href="/teams" className="inline-flex items-center justify-center px-8 py-4 text-base font-black uppercase tracking-widest text-white glass-card rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 italic">
              Explore Teams
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative z-10">
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{stats.teams}</h3>
            <p className="text-gray-400 font-medium">Competing Teams</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{stats.sports}</h3>
            <p className="text-gray-400 font-medium">Sports Events</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-400">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-2">{stats.matches}</h3>
            <p className="text-gray-400 font-medium">Matches Scheduled</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {/* Featured Matches */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-[var(--color-primary-400)]" />
                Featured Matches
              </h2>
              <Link href="/fixtures" className="text-sm font-semibold text-[var(--color-primary-400)] hover:text-white transition-colors">See all →</Link>
            </div>
            <div className="flex flex-col gap-4">
              {matches.map(match => (
                <div key={match.id} className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between border-l-4 border-l-[var(--color-primary-400)]">
                  <div className="mb-4 sm:mb-0 text-center sm:text-left">
                    <span className="text-xs font-bold text-[var(--color-purple-500)] uppercase tracking-wider">{match.category} - {match.leagueFormat}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{match.sport}</h3>
                    <p className="text-sm text-gray-400">{new Date(match.time).toLocaleDateString()} • {match.venue}</p>
                  </div>
                  <div className="flex items-center gap-6 bg-black/40 px-6 py-3 rounded-xl border border-white/5">
                    <span className="text-lg font-black">{match.teamA}</span>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-green-400 font-bold mb-1">{match.status}</span>
                      <span className="text-gray-500 font-bold italic">VS</span>
                    </div>
                    <span className="text-lg font-black">{match.teamB}</span>
                  </div>
                </div>
              ))}
              {matches.length === 0 && (
                <div className="text-center p-10 glass-card">
                  <p className="text-gray-400">No upcoming matches at the moment.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
