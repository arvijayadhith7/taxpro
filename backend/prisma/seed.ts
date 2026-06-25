import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear all existing data
  await prisma.user.deleteMany({});
  
  const hashedPassword = await bcrypt.hash('student123', 10);

  // Create a clean student login for practice
  const student = await prisma.user.create({
    data: {
      pan: 'STUDENT123',
      password: hashedPassword,
      name: 'E-FILING STUDENT',
      email: 'student@taxportal.edu',
      phone: '+91-0000000000',
      role: 'TAXPAYER',
      // No tax returns or notices, leaving a blank slate for practice
    },
  });

  console.log('Clean database seeded with student user:', { student });

  // Create the Admin User
  const admin = await prisma.user.create({
    data: {
      pan: 'admin@taxpro',
      password: await bcrypt.hash('admin321', 10),
      name: 'PORTAL ADMINISTRATOR',
      email: 'admin@taxpro',
      phone: '+91-1112223334',
      role: 'ADMIN',
    },
  });

  console.log('Admin user recreated:', { admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
