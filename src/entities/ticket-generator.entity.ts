import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket-generator')
export class TicketGeneratorEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'ticket', type: 'text' })
  ticket: string;

  @CreateDateColumn() 
  createdAt: Date;
}
export const entitiesToInject = [TicketGeneratorEntity];
