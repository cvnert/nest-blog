import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name); // 日志实例
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(exception?.toString()); // 记录日志
    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      code: status,
      message: exception?.message.split('\n').pop().trim(),
      data: null,
    });
  }
}
