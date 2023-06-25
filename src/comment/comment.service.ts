import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserInfo } from 'src/utils/tool';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  //添加评论
  async create(createCommentDto: CreateCommentDto, token: string) {
    try {
      const { articleId, content } = createCommentDto;
      if (!token) {
        return {
          code: 400,
          msg: '请先登录',
        };
      }
      const userInfo: any = await getUserInfo(token);
      if (!articleId || !content) {
        return {
          code: 400,
          msg: '文章id或评论内容不能为空',
        };
      }
      const res = await this.prisma.comment.create({
        data: {
          articleId,
          content,
          userId: userInfo.id,
        },
      });
      delete res.userId;
      return {
        code: 200,
        msg: '评论成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '评论失败',
      };
    }
  }
  //删除评论
  async remove(id: number, token: string) {
    try {
      await getUserInfo(token);
      const res = await this.prisma.comment.delete({
        where: {
          id,
        },
      });
      return {
        code: 200,
        msg: '删除成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '删除失败',
      };
    }
  }

  //回复评论
  async reply(createCommentDto: CreateCommentDto, token: string) {
    try {
      const userInfo: any = await getUserInfo(token);
      const { articleId, content, partentId } = createCommentDto;
      if (!articleId || !content) {
        return {
          code: 400,
          msg: '文章id或评论内容不能为空',
        };
      }
      const res = await this.prisma.comment.create({
        data: {
          articleId,
          content,
          userId: userInfo.id,
          partentId: partentId,
        },
      });
      delete res.userId;
      return {
        code: 200,
        msg: '回复成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '回复失败',
      };
    }
  }
}
