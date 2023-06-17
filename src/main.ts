import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './all-exception/all-exception.filter';
import { AllResponseInterceptor } from './all-response/all-response.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('接口')
    .setDescription('服务器端API接口')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('cvnert', app, document); // localhost:3000/docs 访问接口文档
  app.useGlobalInterceptors(new AllResponseInterceptor()); // 全局拦截器
  app.useGlobalFilters(new AllExceptionFilter()); // 全局异常过滤器
  app.enableCors({ origin: true, credentials: true }); // 允许跨域和传递cookie

  await app.listen(3000);
}
bootstrap();
