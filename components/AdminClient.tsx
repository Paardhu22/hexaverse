"use client";

import { useState } from "react";
import { updateMatchScore, createMatch, updateLeaderboard } from "@/app/actions";

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
                  <select name="status" defaultValue={m.status} className="bg-white/5 border border-white/10 p-2 rounded text-white text-sm">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Live">Live</option>
                    <option value="Finished">Finished</option>
                  </select>
                  <select name="winner" defaultValue={m.winner || "null"} className="bg-white/5 border border-white/10 p-2 rounded text-white text-sm">
                    <option value="null">No Winner Yet</option>
                    <option value={m.teamA}>{m.teamA}</option>
                    <option value={m.teamB}>{m.teamB}</option>
                  </select>
                </div>

                <div className="col-span-1 text-right">
                  <button type="submit" className="bg-[var(--color-primary-400)]/20 hover:bg-[var(--color-primary-400)]/40 text-[var(--color-primary-400)] px-4 py-2 rounded font-bold w-full transition-colors border border-[var(--color-primary-400)]/50">
                    Update
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
                  <select required name="category" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white">
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Esports">Esports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Team A</label>
                  <select required name="teamA" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white">
                    {teams.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Team B</label>
                  <select required name="teamB" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white">
                    {teams.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Format</label>
                    <input required name="leagueFormat" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="e.g. League, Semi, Final" defaultValue="League" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Venue</label>
                    <input name="venue" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" placeholder="e.g. Main Court" />
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm text-gray-400 mb-1">Date & Time</label>
                    <input required name="time" type="datetime-local" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Status</label>
                    <select required name="status" className="w-full bg-white/5 border border-white/10 p-3 rounded text-white">
                      <option value="Upcoming">Upcoming</option>
                      <option value="Live">Live</option>
                      <option value="Finished">Finished</option>
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
            <h2 className="text-2xl font-bold text-white mb-6">Leaderboard Management</h2>
            {leaderboards.map((l) => (
              <form 
                key={l.id} 
                className="bg-black/30 p-4 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                action={async (formData) => {
                   const gold = parseInt(formData.get("gold") as string) || 0;
                   const silver = parseInt(formData.get("silver") as string) || 0;
                   const points = parseInt(formData.get("points") as string) || 0;
                   await updateLeaderboard(l.team, gold, silver, points);
                   alert("Updated Leaderboard successfully!");
                }}
              >
                <div className="col-span-1 text-xl font-bold text-[var(--color-primary-400)]">{l.team}</div>

                <div className="col-span-1">
                   <label className="text-xs text-gray-400 block mb-1">Gold Medals</label>
                   <input name="gold" type="number" defaultValue={l.gold} className="w-full bg-white/5 border border-white/10 p-2 rounded text-white" />
                </div>
                
                <div className="col-span-1">
                   <label className="text-xs text-gray-400 block mb-1">Silver Medals</label>
                   <input name="silver" type="number" defaultValue={l.silver} className="w-full bg-white/5 border border-white/10 p-2 rounded text-white" />
                </div>
                
                <div className="col-span-1">
                   <label className="text-xs text-gray-400 block mb-1">Total Points</label>
                   <input name="points" type="number" defaultValue={l.points} className="w-full bg-white/5 border border-white/10 p-2 rounded text-white" />
                </div>

                <div className="col-span-1 flex items-end">
                   <button type="submit" className="w-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 hover:bg-yellow-500/30 px-4 py-2 rounded font-bold transition-colors h-10">
                     Save
                   </button>
                </div>
              </form>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
