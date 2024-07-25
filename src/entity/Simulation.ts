import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum StatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS'
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