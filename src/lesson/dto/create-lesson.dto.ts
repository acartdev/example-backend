import { User } from 'src/users/entities/user.entity';

export class CreateLessonDto {
  id: number;
  user_email: User;
  lesson_id: number;
  lang: string;
  send_at: Date;
}
