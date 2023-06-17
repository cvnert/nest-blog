import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [UserModule, RoleModule, TagModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
