import { TypeOrmFieldPositionEntity } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';
import { TypeOrmPlanEntity } from '@/lib/plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { TypeOrmFieldPositionRepository } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.repository';
import { TypeOrmPlanRepository } from '@/lib/plan/infrastructure/TypeOrm/TypeOrmPlanRepository';
import { SettingsGetAll } from '../../application/SettingsGetAll';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmFieldPositionEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
  ],
  controllers: [SettingsController],
  providers: [
    {
      provide: 'FieldPositionRepository',
      useClass: TypeOrmFieldPositionRepository,
    },
    {
      provide: 'PlanRepository',
      useClass: TypeOrmPlanRepository,
    },
    {
      provide: 'SettingsGetAll',
      useFactory: (
        fpRepo: TypeOrmFieldPositionRepository,
        planRepo: TypeOrmPlanRepository,
      ) => new SettingsGetAll(fpRepo, planRepo),
      inject: ['FieldPositionRepository', 'PlanRepository'],
    },
  ],
})
export class SettingsModule {}
