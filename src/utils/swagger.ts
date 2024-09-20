import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Solid Manager API')
  .setDescription('The API for the Solid Manager')
  .setVersion('1.0')
  .addTag('player')
  .build();
