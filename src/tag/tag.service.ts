import { Header, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto, QueryInfo } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import * as jwt from 'jsonwebtoken';

@Injectable({ scope: Scope.REQUEST })
export class TagService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * 分页查询所有的标签
   * @param query
   * @returns
   */
  async getTagInfo(query: QueryInfo) {
    const { page, per } = query;
    const where: any = {};

    if (query.name) {
      where.name = {
        contains: query.name,
      };
    }
    const res = await this.prisma.tag.findMany({
      where,
      skip: (page - 1) * per || 0,
      take: parseInt(per as unknown as string) || 10,
    });
    const total = await this.prisma.tag.count({
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
  /**
   * 创建标签
   */
  async createTag(tag: CreateTagDto, token: string) {
    try {
      //查看是否存在该标签
      const isExist = await this.prisma.tag.findFirst({
        where: {
          name: tag.name,
        },
      });
      if (isExist) {
        return {
          code: 400,
          msg: '该标签已经存在',
        };
      }

      //通过请求头传过来的token获取用户信息
      //解密token
      const decoded = jwt.verify(token, 'cvnert') as any;
      const user = await this.prisma.user.findUnique({
        where: {
          uid: decoded,
        },
      });
      const res = await this.prisma.tag.create({
        data: {
          ...tag,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      delete res.userId;
      delete res.id;
      return {
        code: 200,
        msg: '创建成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '创建失败',
      };
    }
  }
  /**
   * 更新标签
   */
  async updateTag(id: number, tag: UpdateTagDto, token: string) {
    //通过请求头传过来的token获取用户信息
    //解密token
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
    //查询该标签是否存在
    const isExist = await this.prisma.tag.findFirst({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      return {
        code: 400,
        msg: '该标签不存在',
      };
    }
    // 该用户下是否有这个标签
    const isExistTag = await this.prisma.tag.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (!isExistTag) {
      return {
        code: 400,
        msg: '该用户下不存在该标签',
      };
    }
    try {
      const res = await this.prisma.tag.update({
        where: {
          id: id,
        },
        data: {
          ...tag,
        },
      });
      return {
        code: 200,
        msg: '更新成功',
        data: res,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        msg: '更新失败',
      };
    }
  }
  /**
   * 删除标签
   */
  async deleteTag(id: number, token: string) {
    try {
      //通过请求头传过来的token获取用户信息
      //解密token
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
          msg: '该用户不存在',
        };
      }
      // 该用户下是否有这个标签
      const isExist = await this.prisma.tag.findFirst({
        where: {
          id: id,
          userId: user.id,
        },
      });
      if (!isExist) {
        return {
          code: 400,
          msg: '该用户下不存在该标签',
        };
      }

      const res = await this.prisma.tag.delete({
        where: {
          id: id,
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

  /**
   * 查询某个用户创建的所有标签
   */
  async getTagByUserId(token: string) {
    try {
      //通过请求头传过来的token获取用户信息
      //解密token
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
          msg: '该用户不存在',
        };
      }
      const res = await this.prisma.tag.findMany({
        where: {
          userId: user.id,
        },
      });
      return {
        code: 200,
        msg: '查询成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '查询失败',
      };
    }
  }
  /**
   * 管理员删除标签
   */
  async adminDeleteTag(id: number) {
    try {
      const res = await this.prisma.tag.delete({
        where: {
          id: id,
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
}
