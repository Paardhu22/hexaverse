import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.team.deleteMany({});
  
  const teams = [
    { name: 'Agni', captain: 'Captain TBD', description: 'The fiery contenders, bringing unstoppable energy.', logo: '/logos/Agni Logo.png' },
    { name: 'Himadri', captain: 'Captain TBD', description: 'Standing tall and immovable like the mountains.', logo: '/logos/Himadri Logo.png' },
    { name: 'NIAT', captain: 'Captain TBD', description: 'The strategic and intellectual powerhouses.', logo: '/logos/NIAT Logo.png' },
    { name: 'Prithvi', captain: 'Captain TBD', description: 'Grounded, resilient, and unyielding.', logo: '/logos/Prithvi Logo.png' },
    { name: 'Samudra', captain: 'Captain TBD', description: 'Deep, vast, and unpredictable.', logo: '/logos/Samudra Logo.png' },
    { name: 'Vajra', captain: 'Captain TBD', description: 'Striking with the force and precision of thunder.', logo: '/logos/Vajra Logo.png' },
    { name: 'Vayu', captain: 'Captain TBD', description: 'Swift, agile, and omnipresent.', logo: '/logos/Vayu Logo.png' },
  ];

  for (const t of teams) {
    await prisma.team.create({ data: t });
  }
  
  console.log('Successfully seeded teams with PNG logos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
