import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.token);
    const { token } = request.headers;
    if (!token) {
      throw new ForbiddenException('请先登录账号');
    }
    try {
      const decoded = jwt.verify(token, 'cvnert') as any; // 将your_secret_key替换为你自己的密钥
      //通过uid查询用户信息
      const user = await this.prisma.user.findFirst({
        where: {
          uid: decoded,
        },
      });
      if (!user) {
        throw new ForbiddenException('Unauthorized access');
      }
      //获取到roleId,通过roleId查询用户的角色
      const role = await this.prisma.role.findFirst({
        where: {
          id: user.roleId,
        },
      });
      return roles.some((roles) => role.name === roles);
    } catch (error) {
      throw new ForbiddenException('无权限访问');
    }
  }
}
