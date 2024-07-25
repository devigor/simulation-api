import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './User';

export enum StatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

@Entity("simulations")
export class Simulation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
  status: string;

  @Column()
  filename: string;

  @Column()
  userId: number;

  @Column()
  value: string;

  @Column({ type: 'timestamp' })
  simulationDate: Date;

  constructor(userId: number, simulationDate: Date, value: string) {
    this.userId = userId;
    this.status = StatusEnum.PENDING;
    this.value = value;
    this.simulationDate = simulationDate;
  }
}