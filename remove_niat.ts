import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.team.deleteMany({
    where: { name: 'NIAT' }
  });
  console.log(`Successfully removed ${result.count} team(s) named 'NIAT'.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
