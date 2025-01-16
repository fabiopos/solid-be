import { Module } from '@nestjs/common';
import { TypeOrmFieldPositionEntity } from '../type-orm/type-orm-field-position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldPositionController } from './field-position.controller';
import { TypeOrmFieldPositionRepository } from '../type-orm/type-orm-field-position.repository';
import { FieldPositionGetAll } from '../../application/field-position-getall/field-position.getall';

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
