import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { token } = request.headers;
      if (!token) {
        throw new ForbiddenException('请先登录账号');
      }
      return true;
    } catch (error) {
      throw new ForbiddenException('请先登录账号');
    }
  }
}
