"use client";

import { useState, useMemo } from "react";
import { CalendarDays, MapPin, Search, X, ChevronDown } from "lucide-react";

interface Match {
  id: string;
  sport: string;
  category: string;
  teamA: string;
  teamB: string;
  scoreA: string | null;
  scoreB: string | null;
  winner: string | null;
  leagueFormat: string;
  time: string;
  status: string;
  venue: string | null;
}

interface FixturesClientProps {
  initialMatches: Match[];
}

export default function FixturesClient({ initialMatches }: FixturesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    team: "All",
    leagueFormat: "All",
    status: "All",
  });

  // Extract unique values for filters
  const teams = useMemo(() => ["All", ...Array.from(new Set([...initialMatches.map(m => m.teamA), ...initialMatches.map(m => m.teamB)]))], [initialMatches]);
  const leagueFormats = useMemo(() => ["All", ...Array.from(new Set(initialMatches.map(m => m.leagueFormat)))], [initialMatches]);
  const statuses = useMemo(() => ["All", ...Array.from(new Set(initialMatches.map(m => m.status)))], [initialMatches]);

  const filteredMatches = useMemo(() => {
    return initialMatches.filter((match) => {
      // Search logic
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        match.sport.toLowerCase().includes(searchLower) ||
        match.teamA.toLowerCase().includes(searchLower) ||
        match.teamB.toLowerCase().includes(searchLower) ||
        (match.venue?.toLowerCase() || "").includes(searchLower) ||
        match.category.toLowerCase().includes(searchLower) ||
        match.leagueFormat.toLowerCase().includes(searchLower);

      // Filter logic
      const matchesTeam = filters.team === "All" || match.teamA === filters.team || match.teamB === filters.team;
      const matchesLeague = filters.leagueFormat === "All" || match.leagueFormat === filters.leagueFormat;
      const matchesStatus = filters.status === "All" || match.status === filters.status;

      return matchesSearch && matchesTeam && matchesLeague && matchesStatus;
    });
  }, [initialMatches, searchQuery, filters]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      team: "All",
      leagueFormat: "All",
      status: "All",
    });
  };

  const activeFiltersCount = [
    filters.team !== "All",
    filters.leagueFormat !== "All",
    filters.status !== "All",
    searchQuery !== ""
  ].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="glass-card p-4 md:p-6 mb-8 border-white/10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--color-primary-400)] transition-colors" />
            <input
              type="text"
              placeholder="Search by sport, team, or venue..."
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)]/30 transition-all placeholder:text-gray-500 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:w-1/2">
            {/* Team Filter */}
            <div className="relative">
              <select
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-3 pr-10 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-primary-400)] cursor-pointer appearance-none transition-all hover:bg-black/60"
                value={filters.team}
                onChange={(e) => setFilters({ ...filters, team: e.target.value })}
              >
                <option value="All">All Teams</option>
                {teams.filter(t => t !== "All").map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* League Format Filter */}
            <div className="relative">
              <select
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-3 pr-10 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-primary-400)] cursor-pointer appearance-none transition-all hover:bg-black/60"
                value={filters.leagueFormat}
                onChange={(e) => setFilters({ ...filters, leagueFormat: e.target.value })}
              >
                <option value="All">All Rounds</option>
                {leagueFormats.filter(l => l !== "All").map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-3 pr-10 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-primary-400)] cursor-pointer appearance-none transition-all hover:bg-black/60"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="All">All Status</option>
                {statuses.filter(s => s !== "All").map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          
          {activeFiltersCount > 0 && (
            <button 
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-white/5 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 border border-white/10 rounded-xl transition-all"
            >
              <X className="w-4 h-4" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm font-medium">
          Found <span className="text-[var(--color-primary-400)] font-bold">{filteredMatches.length}</span> {filteredMatches.length === 1 ? 'match' : 'matches'} 
          {activeFiltersCount > 0 && " with active filters"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.map((match) => (
          <div key={match.id} className="glass-card flex flex-col justify-between overflow-hidden group hover:border-[var(--color-primary-400)]/30 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black px-2 py-1 rounded bg-black/40 text-[var(--color-primary-400)] border border-[var(--color-primary-400)]/20 uppercase tracking-widest">
                  {match.category} - {match.leagueFormat}
                </span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                  match.status === 'Live' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 
                  match.status === 'Finished' ? 'bg-gray-500/20 text-gray-400' : 
                  'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {match.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-6 text-center tracking-wide group-hover:text-[var(--color-primary-400)] transition-colors">{match.sport}</h3>
              
              <div className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5 mb-6">
                <div className={`flex flex-col items-center flex-1 ${match.winner === match.teamA ? 'text-[var(--color-primary-400)] glow-text' : 'text-gray-200'}`}>
                  <span className="text-xl font-black truncate max-w-[100px]">{match.teamA}</span>
                  {match.scoreA && <span className="text-3xl font-black mt-2">{match.scoreA}</span>}
                </div>
                
                <div className="px-4 text-gray-500 font-bold italic text-sm">VS</div>
                
                <div className={`flex flex-col items-center flex-1 ${match.winner === match.teamB ? 'text-[var(--color-primary-400)] glow-text' : 'text-gray-200'}`}>
                  <span className="text-xl font-black truncate max-w-[100px]">{match.teamB}</span>
                  {match.scoreB && <span className="text-3xl font-black mt-2">{match.scoreB}</span>}
                </div>
              </div>

              {match.winner && (
                <div className="text-center mb-4">
                  <span className="text-[10px] font-bold bg-[var(--color-purple-500)]/20 text-[var(--color-purple-500)] px-3 py-1 rounded-full border border-[var(--color-purple-500)]/30 inline-flex items-center gap-2 uppercase tracking-tighter">
                     WINNER: {match.winner}
                  </span>
                </div>
              )}
            </div>
            
            <div className="bg-white/5 p-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-medium tracking-wider">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-[var(--color-primary-400)]" />
                {new Date(match.time).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              {match.venue && (
                <div className="flex items-center gap-2 max-w-[150px] truncate">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-purple-500)]" />
                  {match.venue}
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredMatches.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-24 glass-card border-dashed border-white/10">
             <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                  <Search className="w-12 h-12 text-gray-600" />
                </div>
             </div>
             <h4 className="text-2xl font-black text-white mb-2 uppercase italic tracking-widest">No matches found</h4>
             <p className="text-gray-400 max-w-md mx-auto mb-8">We couldn't find any matches matching your current search and filter criteria. Try reset or refine your search.</p>
             <button 
              onClick={resetFilters}
              className="px-8 py-3 bg-[var(--color-primary-400)] text-black font-black uppercase italic tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.5)] transition-all hover:scale-105 active:scale-95"
             >
                Reset All Filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
