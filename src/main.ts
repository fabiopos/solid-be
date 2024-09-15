import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Solid Manager API')
    .setDescription('The API for the Solid Manager')
    .setVersion('1.0')
    .addTag('player')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {});

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
