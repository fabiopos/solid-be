import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import entities from './utils/typeorm.entities';
import modules from './utils/typeorm.modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities,
      synchronize: true,
      logging: true,
    }),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
