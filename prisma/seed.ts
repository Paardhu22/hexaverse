import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.team.deleteMany({})
  await prisma.match.deleteMany({})
  await prisma.leaderboard.deleteMany({})
  await prisma.hallOfFame.deleteMany({})

  const teams = [
    { name: 'VAJRA', captain: 'Alex', description: 'The thunderbolt team, ready to strike.', logo: '⚡' },
    { name: 'VAYU', captain: 'Sam', description: 'Swift as the wind, uncatchable.', logo: '🌪️' },
    { name: 'SAMUDRA', captain: 'Jordan', description: 'Deep and powerful, like the ocean.', logo: '🌊' },
    { name: 'AGNI', captain: 'Chris', description: 'Fierce and blazing, burning the competition.', logo: '🔥' },
  ]

  for (const t of teams) {
    await prisma.team.create({ data: t })
    await prisma.leaderboard.create({
      data: { team: t.name, gold: Math.floor(Math.random() * 5), silver: Math.floor(Math.random() * 5), points: Math.floor(Math.random() * 100) }
    })
  }
  
  // Seed past winners
  await prisma.hallOfFame.create({
    data: { year: 2024, winner: 'AGNI', runnerUp: 'VAYU', points: 340, mvp: 'Chris Storm' }
  })
  await prisma.hallOfFame.create({
    data: { year: 2023, winner: 'VAJRA', runnerUp: 'SAMUDRA', points: 310, mvp: 'Alex Thunder' }
  })

  // Seed Matches
  await prisma.match.create({
    data: {
      sport: 'Basketball',
      category: 'Outdoor',
      teamA: 'VAJRA',
      teamB: 'VAYU',
      scoreA: '88',
      scoreB: '92',
      winner: 'VAYU',
      leagueFormat: 'Finals',
      time: new Date(),
      status: 'Finished',
      venue: 'Main Court'
    }
  })
  
  await prisma.match.create({
    data: {
      sport: 'BGMI',
      category: 'Esports',
      teamA: 'SAMUDRA',
      teamB: 'AGNI',
      scoreA: null,
      scoreB: null,
      winner: null,
      leagueFormat: 'Semi',
      time: new Date(Date.now() + 1000 * 60 * 60 * 24),
      status: 'Upcoming',
      venue: 'Esports Arena'
    }
  })
  
  await prisma.match.create({
    data: {
      sport: 'Table Tennis',
      category: 'Indoor',
      teamA: 'VAJRA',
      teamB: 'SAMUDRA',
      scoreA: '2',
      scoreB: '1',
      winner: null,
      leagueFormat: 'League',
      time: new Date(),
      status: 'Live',
      venue: 'Indoor Hall A'
    }
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
