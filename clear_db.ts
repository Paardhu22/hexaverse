import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.match.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.hallOfFame.deleteMany({});
  await prisma.leaderboard.deleteMany({});
  console.log('Successfully removed all mock data from the database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
