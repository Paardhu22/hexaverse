import prisma from "@/lib/prisma";
import FixturesClient from "@/components/FixturesClient";

export const dynamic = "force-dynamic";

export default async function FixturesPage() {
  let matches: any[] = [];
  try {
    matches = await prisma.match.findMany({
      orderBy: { time: 'asc' }
    });
  } catch (error) {
    console.error("Database connection error on fixtures page:", error);
  }

  // Convert dates to strings for client components if necessary
  const processedMatches = matches.map(match => ({
    ...match,
    time: match.time.toISOString()
  }));

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black italic mb-2 tracking-wide text-white glow-text text-center md:text-left">
          MATCH <span className="text-[var(--color-primary-400)]">FIXTURES</span>
        </h1>
        <p className="text-gray-400 mb-12 text-lg text-center md:text-left">All schedules, live scores, and finished match results.</p>

        <FixturesClient initialMatches={processedMatches} />
      </div>
    </div>
  );
}
