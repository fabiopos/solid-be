import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Solid Manager API')
  .setDescription('The API for the Solid Manager')
  .setVersion('1.0')
  .addTag('player')
  .build();
