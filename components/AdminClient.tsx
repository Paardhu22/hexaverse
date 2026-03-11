"use client";

import { useState } from "react";
import { updateMatchScore, createMatch, updateLeaderboard, deleteMatch, deleteLeaderboard, bulkUpdateLeaderboard } from "@/app/actions";
import { Trash2, AlertTriangle, CheckCircle2, Trophy, LogOut } from "lucide-react";

type Match = any; // Typing shorthand for speed, adjust in real prod
type Leaderboard = any;

interface AdminClientProps {
  initialMatches: Match[];
  initialLeaderboards: Leaderboard[];
  teams: string[];
}

export default function AdminClient({ initialMatches, initialLeaderboards, teams }: AdminClientProps) {
  const [activeTab, setActiveTab] = useState("scores");
  const [matches, setMatches] = useState(initialMatches);
  const [leaderboards, setLeaderboards] = useState(initialLeaderboards);

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {["scores", "schedule", "leaderboard"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-t-xl font-bold uppercase tracking-wider text-sm transition-all ${
              activeTab === tab 
                ? "bg-[var(--color-primary-400)]/20 text-[var(--color-primary-400)] border-b-2 border-[var(--color-primary-400)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
        <button
          onClick={() => {
            if (confirm("Logout from admin session?")) {
              localStorage.removeItem("hexa_admin_session");
              window.location.reload();
            }
          }}
          className="ml-auto flex items-center gap-2 px-4 py-3 text-red-500 hover:text-red-400 hover:bg-red-500/5 transition-all font-bold text-sm uppercase tracking-widest rounded-t-xl"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="glass-card p-6 md:p-8 min-h-[500px]">
        
        {/* TAB: Live Scores */}
        {activeTab === "scores" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Live Score Management</h2>
            {matches.map((m) => (
              <form 
                key={m.id} 
                className="bg-black/30 p-4 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                action={async (formData) => {
                   const sA = formData.get("scoreA") as string;
                   const sB = formData.get("scoreB") as string;
                   const status = formData.get("status") as string;
                   const winner = formData.get("winner") as string;
                   await updateMatchScore(m.id, sA, sB, status, winner === "null" ? null : winner);
                   alert("Updated Match successfully!");
                }}
              >
                <div className="col-span-1 md:col-span-2">
                  <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">{m.sport} - {m.category}</div>
                  <div className="font-bold text-white flex gap-2 w-full">
                    {m.teamA} vs {m.teamB}
                  </div>
                </div>

                <div className="col-span-1 flex items-center gap-2">
                  <input name="scoreA" defaultValue={m.scoreA || ""} placeholder="A" className="w-16 bg-white/5 border border-white/10 p-2 rounded text-center text-white" />
                  <span className="text-gray-500">-</span>
                  <input name="scoreB" defaultValue={m.scoreB || ""} placeholder="B" className="w-16 bg-white/5 border border-white/10 p-2 rounded text-center text-white" />
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                  <select 
                    name="status" 
                    defaultValue={m.status} 
                    className="appearance-none bg-navy-800/80 border border-white/10 p-2 md:p-3 rounded-lg text-white text-sm focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all cursor-pointer hover:bg-navy-700/50"
                  >
                    <option value="Upcoming" className="bg-navy-900">🕒 Upcoming</option>
                    <option value="Finished" className="bg-navy-900">🏁 Finished</option>
                  </select>
                  <select 
                    name="winner" 
                    defaultValue={m.winner || "null"} 
                    className="appearance-none bg-navy-800/80 border border-white/10 p-2 md:p-3 rounded-lg text-white text-sm focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all cursor-pointer hover:bg-navy-700/50"
                  >
                    <option value="null" className="bg-navy-900">No Winner Yet</option>
                    <option value={m.teamA} className="bg-navy-900">🏆 {m.teamA}</option>
                    <option value={m.teamB} className="bg-navy-900">🏆 {m.teamB}</option>
                  </select>
                </div>

                <div className="col-span-1 flex gap-2">
                  <button type="submit" className="flex-1 bg-[var(--color-primary-400)]/20 hover:bg-[var(--color-primary-400)]/40 text-[var(--color-primary-400)] px-4 py-2 rounded font-bold transition-all border border-[var(--color-primary-400)]/50 active:scale-95">
                    Update
                  </button>
                  <button 
                    type="button"
                    onClick={async () => {
                      if (confirm(`Delete match ${m.teamA} vs ${m.teamB}?`)) {
                        await deleteMatch(m.id);
                        window.location.reload();
                      }
                    }}
                    className="bg-red-500/10 hover:bg-red-500/30 text-red-500 p-2 rounded border border-red-500/30 transition-all active:scale-95"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </form>
            ))}
          </div>
        )}

        {/* TAB: Schedule Management */}
        {activeTab === "schedule" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Schedule Management</h2>
            <form action={async (formData) => {
              const data = {
                sport: formData.get("sport") as string,
                category: formData.get("category") as string,
                teamA: formData.get("teamA") as string,
                teamB: formData.get("teamB") as string,
                leagueFormat: formData.get("leagueFormat") as string,
                time: new Date(formData.get("time") as string),
                status: formData.get("status") as string,
                venue: formData.get("venue") as string,
              };
              await createMatch(data);
              alert("Created Match!");
              window.location.reload();
            }} className="max-w-2xl bg-black/30 p-6 rounded-xl border border-white/5 flex flex-col gap-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Sport</label>
                  <input required name="sport" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="e.g. BGMI" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select 
                    required 
                    name="category" 
                    className="appearance-none w-full bg-navy-800/80 border border-white/10 p-3.5 rounded-xl text-white focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all cursor-pointer hover:bg-navy-700/50 outline-none"
                  >
                    <option value="Indoor" className="bg-navy-900">🏠 Indoor</option>
                    <option value="Outdoor" className="bg-navy-900">🌳 Outdoor</option>
                    <option value="Esports" className="bg-navy-900">🎮 Esports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Team A</label>
                  <select 
                    required 
                    name="teamA" 
                    className="appearance-none w-full bg-navy-800/80 border border-white/10 p-3.5 rounded-xl text-white focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all cursor-pointer hover:bg-navy-700/50 outline-none"
                  >
                    {teams.map(t => <option key={t} value={t} className="bg-navy-900">🛡️ {t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Team B</label>
                  <select 
                    required 
                    name="teamB" 
                    className="appearance-none w-full bg-navy-800/80 border border-white/10 p-3.5 rounded-xl text-white focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all cursor-pointer hover:bg-navy-700/50 outline-none"
                  >
                    {teams.map(t => <option key={t} value={t} className="bg-navy-900">🛡️ {t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Format</label>
                    <select 
                      required 
                      name="leagueFormat" 
                      className="appearance-none w-full bg-navy-800/80 border border-white/10 p-3.5 rounded-xl text-white focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all cursor-pointer hover:bg-navy-700/50 outline-none"
                    >
                      <option value="League" className="bg-navy-900">📊 League</option>
                      <option value="Semi's" className="bg-navy-900">⚔️ Semi's</option>
                      <option value="Finals" className="bg-navy-900">🏆 Finals</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Venue</label>
                    <input name="venue" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="e.g. Main Court" />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm text-gray-400 mb-1">Date</label>
                     <input required name="time" type="date" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" />
                   </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Status</label>
                    <select 
                      required 
                      name="status" 
                      className="appearance-none w-full bg-navy-800/80 border border-white/10 p-3.5 rounded-xl text-white focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all cursor-pointer hover:bg-navy-700/50 outline-none"
                    >
                      <option value="Upcoming" className="bg-navy-900">🕒 Upcoming</option>
                      <option value="Finished" className="bg-navy-900">🏁 Finished</option>
                    </select>
                  </div>
              </div>

              <button type="submit" className="mt-4 bg-[var(--color-purple-500)] text-white px-6 py-3 rounded-lg font-bold transition-transform hover:scale-[1.02]">
                Create Match Schedule
              </button>

            </form>
          </div>
        )}

        {/* TAB: Leaderboard Management */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Leaderboard Management</h2>
            </div>

            <form 
              action={async (formData) => {
                const updates = teams.map(teamName => ({
                  team: teamName,
                  gold: parseInt(formData.get(`gold-${teamName}`) as string) || 0,
                  silver: parseInt(formData.get(`silver-${teamName}`) as string) || 0,
                  points: parseInt(formData.get(`points-${teamName}`) as string) || 0,
                }));
                await bulkUpdateLeaderboard(updates);
                alert("All leaderboard changes saved successfully!");
              }}
              className="space-y-6"
            >
              {teams.map((teamName) => {
                const l = leaderboards.find((lb: any) => lb.team === teamName) || { team: teamName, gold: 0, silver: 0, points: 0, id: teamName };
                return (
                  <div 
                    key={teamName} 
                    className="bg-navy-800/40 p-5 rounded-2xl border border-white/5 hover:bg-navy-800/60 transition-colors grid grid-cols-1 md:grid-cols-5 gap-6 items-center shadow-lg group relative"
                  >
                    <div className="col-span-1 flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[var(--color-primary-400)]/20 flex items-center justify-center border border-[var(--color-primary-400)]/30">
                         <Trophy className="w-5 h-5 text-[var(--color-primary-400)]" />
                       </div>
                       <span className="text-xl font-black text-white">{teamName}</span>
                    </div>

                    <div className="col-span-1">
                       <label className="text-xs text-yellow-500 font-bold block mb-2 uppercase tracking-wider flex items-center gap-1">🥇 Gold Medals</label>
                       <input name={`gold-${teamName}`} type="number" defaultValue={l.gold} className="w-full bg-navy-900/80 border border-white/10 p-3 rounded-xl text-yellow-500 font-bold focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none" />
                    </div>
                    
                    <div className="col-span-1">
                       <label className="text-xs text-gray-300 font-bold block mb-2 uppercase tracking-wider flex items-center gap-1">🥈 Silver Medals</label>
                       <input name={`silver-${teamName}`} type="number" defaultValue={l.silver} className="w-full bg-navy-900/80 border border-white/10 p-3 rounded-xl text-gray-300 font-bold focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all outline-none" />
                    </div>
                    
                    <div className="col-span-1">
                       <label className="text-xs text-[var(--color-primary-400)] font-bold block mb-2 uppercase tracking-wider flex items-center gap-1">⭐ Total Points</label>
                       <input name={`points-${teamName}`} type="number" defaultValue={l.points} className="w-full bg-navy-900/80 border border-white/10 p-3 rounded-xl text-[var(--color-primary-400)] font-bold text-lg focus:border-[var(--color-primary-400)] focus:ring-1 focus:ring-[var(--color-primary-400)] transition-all outline-none" />
                    </div>

                    <div className="col-span-1 flex justify-end">
                       <button 
                        type="button"
                        onClick={async () => {
                          if (confirm(`Reset ${teamName} data? This will set gold, silver and points to 0.`)) {
                            await updateLeaderboard(teamName, 0, 0, 0);
                            window.location.reload();
                          }
                        }}
                        className="bg-red-500/10 hover:bg-red-500/30 text-red-500 p-2 rounded border border-red-500/30 transition-all active:scale-95 h-10 flex items-center justify-center"
                        title="Reset Data"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="sticky bottom-0 pt-6 pb-2 bg-[var(--background)] bg-opacity-80 backdrop-blur-sm">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  Save All Leaderboard Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
