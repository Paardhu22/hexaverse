import prisma from "@/lib/prisma";
import TeamsClient from "@/components/TeamsClient";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({
    orderBy: { name: 'asc' }
  });

  const matches = await prisma.match.findMany({
    orderBy: { time: 'asc' }
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black italic mb-2 tracking-wide text-white glow-text">
            COMPETING <span className="text-[var(--color-primary-400)]">FACTIONS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore the distinct teams fighting for the ultimate championship. Click any team to see their scheduled games.
          </p>
        </div>

        <TeamsClient teams={teams} matches={matches} />
      </div>
    </div>
  );
}
