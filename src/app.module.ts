import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TagModule } from './tag/tag.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [UserModule, RoleModule, TagModule, FollowModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
