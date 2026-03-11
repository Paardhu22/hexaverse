import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const teamUpdates = [
    { name: 'Agni', logo: '/logos/Agni_Logo-removebg-preview.png' },
    { name: 'Samudra', logo: '/logos/Samudra_Logo-removebg-preview.png' },
    { name: 'Vajra', logo: '/logos/Vajra_Logo-removebg-preview.png' },
    { name: 'Vayu', logo: '/logos/Vayu_Logo-removebg-preview.png' },
  ];

  for (const update of teamUpdates) {
    await prisma.team.update({
      where: { name: update.name },
      data: { logo: update.logo }
    });
    console.log(`Updated logo for ${update.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
