import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { encodePwd, sign } from 'src/utils/tool';

import { CreateUserDto, QueryInfo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  //登录
  async login(user: CreateUserDto) {
    try {
      if (!user.username && !user.password) {
        return {
          code: 400,
          msg: '账号或密码不能为空',
        };
      }
      const res = await this.prisma.user.findFirst({
        where: {
          username: user.username,
        },
      });
      console.log(res);
      if (res.password === encodePwd(user.password)) {
        return {
          code: 200,
          msg: '登录成功',
          data: await sign(res.uid),
        };
      } else {
        return {
          code: 400,
          msg: '账号或密码错误',
        };
      }
    } catch (error) {}
  }
  //注册
  async register(user: CreateUserDto) {
    try {
      if (!user.username && !user.password) {
        return {
          code: 400,
          msg: '账号或密码不能为空',
        };
      }
      //判断账号是否存在

      const isExist = await this.prisma.user.findFirst({
        where: {
          username: user.username,
        },
      });

      if (isExist) {
        return {
          code: 400,
          msg: '账号已存在',
        };
      }
      //生成uid
      const uid = randomUUID();
      //加密password
      const newPassword = encodePwd(user.password);
      console.log(newPassword);
      const res = await this.prisma.user.create({
        data: {
          username: user.username,
          password: newPassword,
          email: '',
          uid,
        },
      });
      delete res.password;
      delete res.roleId;
      return {
        code: 200,
        msg: '注册成功',
        data: res,
      };
    } catch (error) {
      console.log(error);
    }
  }
  //获取用户信息 模糊查询 分页查询
  async getUserInfo(query: QueryInfo) {
    const { page, per } = query;
    const where: any = {};
    if (query.username) {
      where.username = { contains: query.username };
    }
    if (query.nickname) {
      where.nickname = { contains: query.nickname };
    }
    if (query.phone) {
      where.phone = { contains: query.phone };
    }
    if (query.email) {
      where.email = { contains: query.email };
    }
    const userInfo = await this.prisma.user.findMany({
      where,
      skip: (page - 1) * per,
      take: parseInt(per as unknown as string),
    });
    userInfo.map((item) => {
      delete item.password;
      delete item.roleId;
    });

    return userInfo;
  }
  // 修改用户
  async updateUser(uid: string, updateUserDto: UpdateUserDto) {
    const { nickname, phone, email, avatar, description } = updateUserDto;
    const updateUserInfo = await this.prisma.user.update({
      where: {
        uid: uid,
      },
      data: {
        nickname,
        phone,
        email,
        avatar,
        description,
      },
    });
    delete updateUserInfo.password;
    delete updateUserInfo.roleId;
    return updateUserInfo;
  }
  //删除用户
  async deleteUser(uid: string) {
    try {
      //所要删除的用户是否存在
      const isExist = await this.prisma.user.findFirst({
        where: {
          uid: uid,
        },
      });
      if (!isExist) {
        return {
          code: 400,
          msg: '用户不存在',
        };
      }
      //删除用户
      const deleteUserInfo = await this.prisma.user.delete({
        where: {
          uid: uid,
        },
      });
      if (!deleteUserInfo) {
        return {
          code: 400,
          msg: '删除失败',
        };
      }
    } catch (error) {
      new Error(error);
    }
    return {
      code: 200,
      msg: '删除成功',
    };
  }
  //查询单个用户
  async findOne(uid: string) {
    try {
      const userInfo = await this.prisma.user.findFirst({
        where: {
          uid: uid,
        },
      });
      if (!userInfo) {
        return {
          code: 400,
          msg: '用户不存在',
        };
      }
      delete userInfo.password;
      delete userInfo.roleId;
      return {
        code: 200,
        msg: '查询成功',
        data: userInfo,
      };
    } catch (error) {
      new Error(error);
    }
  }
}
