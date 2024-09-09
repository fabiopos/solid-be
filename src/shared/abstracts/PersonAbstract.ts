import { Column, CreateDateColumn } from 'typeorm';
import { DocumentType } from '@/shared/enums/playerEnums';

export abstract class PersonAbstract {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  documentNumber: string;

  @Column({ type: 'enum', enum: DocumentType, default: DocumentType.OTHER })
  documentType: DocumentType;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  avatarUrl?: string | null;

  @Column({ nullable: true })
  phone?: string | null;

  @Column({ nullable: true })
  address?: string | null;

  @Column({ nullable: true })
  city?: string | null;

  @Column({ nullable: true })
  country?: string | null;

  @CreateDateColumn()
  createdAt: Date | null;
}
