import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesGuard } from 'src/roles.guard';
import { ROLES_KEY } from 'src/roles.decorator';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    PrismaService,
    {
      provide: ROLES_KEY,
      useClass: RolesGuard,
    },
  ],
})
export class RoleModule {}
