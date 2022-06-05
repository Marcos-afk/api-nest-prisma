import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import { DataBaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.interceptor';
//import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DataBaseInterceptor());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  await app.listen(process.env.PORT);
}

bootstrap();
