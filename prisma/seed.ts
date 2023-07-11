import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const roleList = [
  { name: 'Admin', description: '管理员' },
  { name: 'User', description: '普通用户' },
  { name: 'Vip', description: 'Vip用户' },
];
async function main() {
  for (let i = 0; i < 3; i++) {
    await prisma.role.create({
      data: {
        name: roleList[i].name,
        description: roleList[i].description,
      },
    });
  }
  //   await prisma.role.create({
  //     data: {
  //       name: 'Admin',
  //       description: '管理员',
  //     },
  //   });
  //   await prisma.role.create({
  //     data: {
  //       name: 'Admin',
  //       description: '管理员',
  //     },
  //   });
  //   await prisma.role.create({
  //     data: {
  //       name: 'Admin',
  //       description: '管理员',
  //     },
  //   });
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
