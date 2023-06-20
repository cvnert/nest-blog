import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TagModule } from './tag/tag.module';
import { FollowModule } from './follow/follow.module';
import { UploadModule } from './upload/upload.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [UserModule, RoleModule, TagModule, FollowModule, UploadModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
