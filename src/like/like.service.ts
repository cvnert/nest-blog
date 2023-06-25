import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserInfo } from 'src/utils/tool';
import { CreateLikeDto, QueryInfo } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  // 点赞文章
  async create(createLikeDto: CreateLikeDto, token: string) {
    try {
      const { articleId } = createLikeDto;
      if (!articleId) {
        return {
          code: 400,
          msg: '文章id不能为空',
        };
      }
      const userInfo: any = await getUserInfo(token);
      const userId = userInfo.id;
      const like = await this.prisma.like.create({
        data: {
          articleId,
          userId,
        },
      });
      return {
        code: 200,
        msg: '点赞成功',
        data: {
          id: like.id,
          createdAt: like.createdAt,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  // 取消点赞
  async remove(id: number, token: string) {
    try {
      await getUserInfo(token);
      const like = await this.prisma.like.delete({
        where: {
          id,
        },
      });
      return like;
    } catch (error) {
      console.log(error);
    }
  }
}
