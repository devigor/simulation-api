import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './User';

@Entity("simulations")
export class Simulation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.simulations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp' })
  simulationDate: Date;

  constructor(userId: number, simulationDate: Date) {
    this.user = { id: userId } as User;
    this.simulationDate = simulationDate;
  }
}