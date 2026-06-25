import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  // Upsert Admin
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@vibetech.edu',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  // Upsert Student
  await prisma.user.upsert({
    where: { username: 'student' },
    update: {},
    create: {
      username: 'student',
      email: 'student@college.edu',
      password: studentPassword,
      role: 'STUDENT'
    }
  });

  // Create Sample Event if none exist
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    await prisma.event.create({
      data: {
        title: 'AI & Vibe Coding Workshop',
        venue: 'College Seminar Hall',
        eventDate: new Date('2026-07-15T10:00:00Z'),
        seats: 100,
        speaker: 'John Doe',
        description: "Join us for an interactive coding workshop where we'll explore AI-driven development and modern web technologies."
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
