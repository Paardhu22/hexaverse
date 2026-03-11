import prisma from "@/lib/prisma";
import AdminClient from "@/components/AdminClient";
import AdminAuth from "./AdminAuth";

export default async function AdminPage() {
  const matches = await prisma.match.findMany({
    orderBy: { time: 'desc' }
  });

  const leaderboards = await prisma.leaderboard.findMany({
    orderBy: { points: 'desc' }
  });

  const teams = await prisma.team.findMany({
    select: { name: true }
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black italic mb-8 tracking-wide text-white glow-text text-center md:text-left">
          CONTROL <span className="text-red-400">PANEL</span>
        </h1>

        <AdminAuth>
          <AdminClient
            initialMatches={matches}
            initialLeaderboards={leaderboards}
            teams={teams.map(t => t.name)}
          />
        </AdminAuth>
      </div>
    </div>
  );
}
