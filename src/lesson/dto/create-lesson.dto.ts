import { User } from 'src/users/entities/user.entity';

export class CreateLessonDto {
  user_email: User;
  lesson_id: number;
  lang: string;
  text: string;
  send_at: Date;
}
