import { Module } from '@nestjs/common';
import { TypeOrmFieldPositionEntity } from '../TypeOrm/TypeOrmFieldPositionEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldPositionController } from './fieldPosition.controller';
import { TypeOrmFieldPositionRepository } from '../TypeOrm/TypeOrmFieldPositionRepository';
import { FieldPositionGetAll } from '../../application/FieldPositionGetAll/FieldPositionGetAll';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmFieldPositionEntity])],
  controllers: [FieldPositionController],
  providers: [
    {
      provide: 'FieldPositionRepository',
      useClass: TypeOrmFieldPositionRepository,
    },
    {
      provide: 'FieldPositionGetAll',
      useFactory: (fieldPositionRepository: TypeOrmFieldPositionRepository) =>
        new FieldPositionGetAll(fieldPositionRepository),
      inject: ['FieldPositionRepository'],
    },
  ],
})
export class FieldPositionModule {}
