import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { hashPassword } from '../utils/hash';

export enum UserRole {
  USER = 'USER',
  SUPERUSER = 'SUPERUSER'
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(1, 255)
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @Length(6, 255)
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(name: string, email: string, password: string, role: UserRole = UserRole.USER) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hashPassword(this.password);
  }
}
