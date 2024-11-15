import { TypeOrmFieldPositionEntity } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { TypeOrmFieldPositionRepository } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionRepository';
import { TypeOrmPlanRepository } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanRepository';
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
