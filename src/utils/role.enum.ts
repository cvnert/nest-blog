import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum Role {
  User = '普通用户',
  Admin = '管理员',
  Vip = 'VIP用户',
}
export default async function getRoles(): Promise<Role[]> {
  const roles = await prisma.role.findMany();
  const roleNames = roles.map((role) => role.name);
  const roleEnums = roleNames.map((name) => Role[name]);
  return roleEnums;
}
