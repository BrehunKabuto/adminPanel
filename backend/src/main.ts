import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  cookieParser from "cookie-parser"
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  ) 
  app.use(cookieParser())

  app.enableCors({
    origin: [process.env.FRONTEND_URL!],
    methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true,
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

