import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { CreateArticleDto, QueryInfo } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  //创建文章
  async create(createArticleDto: CreateArticleDto, token: string) {
    //token解析出用户id
    const decoded = jwt.verify(token, 'cvnert') as any;
    const user = await this.prisma.user.findUnique({
      where: {
        uid: decoded,
      },
    });
    //查询该用户是否存在
    if (!user) {
      return {
        code: 400,
        msg: '用户不存在',
      };
    }
    if (!createArticleDto.title) {
      return {
        code: 400,
        msg: '标题不能为空',
      };
    }
    if (!createArticleDto.content) {
      return {
        code: 400,
        msg: '内容不能为空',
      };
    }
    if (!createArticleDto.cover) {
      return {
        code: 400,
        msg: '封面不能为空',
      };
    }
    if (!createArticleDto.description) {
      return {
        code: 400,
        msg: '描述不能为空',
      };
    }
    if (createArticleDto.tag < 0) {
      return {
        code: 400,
        msg: '标签不能为空',
      };
    }
    //查询标签是否存在
    const tag = await this.prisma.tag.findUnique({
      where: {
        id: createArticleDto.tag,
      },
    });
    //标签不存在
    if (!tag) {
      return {
        code: 400,
        msg: '标签不存在',
      };
    }
    //创建文章
    try {
      const res = await this.prisma.article.create({
        data: {
          ...createArticleDto,
          author: {
            connect: {
              id: user.id,
            },
          },
          tag: {
            connect: {
              id: tag.id,
            },
          },
        },
      });
      return {
        code: 200,
        msg: '创建成功',
        data: res,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        msg: '创建失败',
      };
    }
  }
  //查询文章列表,分页,模糊查询
  async findAll(query: QueryInfo) {
    //分页
    let { page, per, title } = query;
    console.log(page, per, title);
    if (!page) {
      page = 1;
    }
    if (!per) {
      per = 10;
    }
    //模糊查询
    const where = title
      ? {
          title: {
            contains: title,
          },
        }
      : {};
    //查询文章列表
    const res = await this.prisma.article.findMany({
      where,
      skip: (page - 1) * per,
      take: parseInt(per as unknown as string),
      include: {
        author: {
          select: {
            username: true,
            avatar: true,
            email: true,
            description: true,
            phone: true,
          },
        },
        tag: {
          select: {
            name: true,
          },
        },
        like: true,
        Comment: true,
        Collect: true,
      },
    });
    //查询文章总数
    const total = await this.prisma.article.count({
      where,
    });
    return {
      code: 200,
      msg: '查询成功',
      data: {
        list: res,
        total,
      },
    };
  }
}
