import { User } from 'src/users/entities/user.entity';

export interface LessonType {
  user_email: string | null | User;
  lesson_id: number;
  text: string;
  lang: string;
}
