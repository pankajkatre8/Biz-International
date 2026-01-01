import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'manager@biz.com' },
    update: {},
    create: { email: 'manager@biz.com', name: 'Manager', password: pass, role: 'MANAGER' },
  });
  await prisma.user.upsert({
    where: { email: 'supervisor@biz.com' },
    update: {},
    create: { email: 'supervisor@biz.com', name: 'Supervisor', password: pass, role: 'SUPERVISOR' },
  });
  console.log('seed done');
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
