import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}
  //创建角色

  async create(createRoleDto: CreateRoleDto) {
    try {
      if (!createRoleDto.name) {
        return {
          code: 400,
          msg: '角色名不能为空',
        };
      }
      //判断角色是否存在
      const isExist = await this.prisma.role.findFirst({
        where: {
          name: createRoleDto.name,
        },
      });
      if (isExist) {
        return {
          code: 400,
          msg: '角色已存在',
        };
      }
      const res = await this.prisma.role.create({
        data: {
          ...createRoleDto,
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
  //查询角色
  async findAll() {
    try {
      const res = await this.prisma.role.findMany();
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
  // 提升用户的权限(普通用户到vip或者管理员)
  async updateRole(uid: string, roleId: UpdateRoleDto['roleId']) {
    try {
      const res = await this.prisma.user.findFirst({
        where: {
          uid: uid,
        },
      });
      if (!res) {
        return {
          code: 400,
          msg: '用户不存在',
        };
      }
      //判断角色是否存在
      const isExist = await this.prisma.role.findFirst({
        where: {
          id: roleId,
        },
      });
      if (!isExist) {
        return {
          code: 400,
          msg: '角色不存在',
        };
      }
      const updateInfo = await this.prisma.user.update({
        where: {
          uid: uid,
        },
        data: {
          roleId: roleId,
        },
      });
      delete updateInfo.password;
      delete updateInfo.uid;
      return {
        code: 200,
        msg: '提升成功',
        data: updateInfo,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '提升失败',
      };
    }
  }
}
