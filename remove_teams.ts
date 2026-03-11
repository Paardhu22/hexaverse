import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.team.deleteMany({
    where: { 
      name: { in: ['Himadri', 'Prithvi'] }
    }
  });
  console.log(`Successfully removed ${result.count} team(s) (Himadri, Prithvi).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
