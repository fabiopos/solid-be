import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feature')
export class TypeOrmFeatureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  enabled: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
