import { Entity, Column, CreateDateColumn } from 'typeorm';
import { Role } from './userType';

@Entity()
export class User {
  @Column({ unique: true, length: 100, primary: true })
  email: string;

  @Column({ length: 50 })
  name: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ length: 200 })
  password: string;

  @CreateDateColumn()
  create_at: Date;

  @Column({ enum: Role, default: Role.user, type: 'enum' })
  role: Role;
}
