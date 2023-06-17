import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto, QueryInfo } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
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
  async createTag(tag: CreateTagDto) {
    try {
      const res = await this.prisma.tag.create({
        data: {
          ...tag,
        },
      });
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
  async updateTag(id: number, tag: UpdateTagDto) {
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
  async deleteTag(id: number) {
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
