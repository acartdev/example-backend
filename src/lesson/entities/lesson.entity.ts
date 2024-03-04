import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lesson_id: number;

  @ManyToOne(() => User, (user) => user.email, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_email' })
  user_email: User;

  @Column({ default: 'JavaScript' })
  lang: string;

  @Column({ type: 'text' })
  text: string;

  @CreateDateColumn()
  send_at: Date;
}
