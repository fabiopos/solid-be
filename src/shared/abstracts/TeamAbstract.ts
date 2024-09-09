import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class TeamAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  primaryColor: string;

  @Column({ nullable: true })
  secondaryColor: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  logoUrl: string | null;

  @Column({ nullable: true })
  shieldUrl: string;

  @Column({ default: true })
  active: boolean;
}
