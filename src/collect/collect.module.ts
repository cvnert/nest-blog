import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CollectController],
  providers: [CollectService, PrismaService],
})
export class CollectModule {}
