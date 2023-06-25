import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserInfo } from 'src/utils/tool';
import { CreateCollectDto } from './dto/create-collect.dto';
import { UpdateCollectDto } from './dto/update-collect.dto';

@Injectable()
export class CollectService {
  constructor(private readonly prisma: PrismaService) {}

  // 收藏文章
  async create(createCollectDto: CreateCollectDto, token: string) {
    try {
      const { articleId } = createCollectDto;
      if (!articleId) {
        return {
          code: 400,
          msg: '文章id不能为空',
        };
      }
      const userInfo: any = await getUserInfo(token);
      const userId = userInfo.id;
      // 判断是否已经收藏
      const isCollect = await this.prisma.collect.findFirst({
        where: {
          articleId,
          userId,
        },
      });
      if (isCollect) {
        return {
          code: 400,
          msg: '已经收藏过了',
        };
      }

      const collect = await this.prisma.collect.create({
        data: {
          articleId,
          userId,
        },
      });

      return {
        code: 200,
        msg: '收藏成功',
        data: {
          id: collect.id,
          createdAt: collect.createdAt,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  // 取消收藏
  async remove(id: number, token: string) {
    try {
      await getUserInfo(token);
      const collect = await this.prisma.collect.delete({
        where: {
          id,
        },
      });
      return {
        code: 200,
        msg: '取消收藏成功',
        data: {
          id: collect.id,
          createdAt: collect.createdAt,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
}
