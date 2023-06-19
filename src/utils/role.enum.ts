import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum Role {
  User = 'User',
  Admin = 'Admin',
  Vip = 'Vip',
}
export default async function getRoles(): Promise<Role[]> {
  const roles = await prisma.role.findMany();
  const roleNames = roles.map((role) => role.name);
  const roleEnums = roleNames.map((name) => Role[name]);
  return roleEnums;
}
