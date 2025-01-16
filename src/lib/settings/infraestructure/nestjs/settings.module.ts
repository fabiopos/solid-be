import { TypeOrmFieldPositionEntity } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';
import { TypeOrmPlanEntity } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './settings.controller';
import { TypeOrmFieldPositionRepository } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.repository';
import { TypeOrmPlanRepository } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.repository';
import { SettingsGetAll } from '../../application/settings.getall';

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
