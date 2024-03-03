import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonDetail } from './dto/detail.dto';
import { Avgs } from './dto/avg.dto';
import { UsersService } from 'src/users/users.service';
import { LessonType } from './dto/lesson-detail.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepositoy: Repository<Lesson>,
    private readonly userService: UsersService,
  ) {}

  async findeLesson(email: string): Promise<LessonType[] | null> {
    const lesson = await this.lessonRepositoy.find({
      where: { user_email: { email } },
    });
    if (!lesson)
      throw new BadRequestException('เกิดข้อผิดพลาดในการดึงข้อมูล!!');
    return lesson;
  }
  async create(createLessonDto: CreateLessonDto[]): Promise<any> {
    try {
      for (let lesson of createLessonDto) {
        this.lessonRepositoy.save(lesson);
      }
      return new HttpException('ส่งแบบทดสอบสำเร็จ!', 201);
    } catch (e) {
      throw new BadRequestException({
        message: 'เกิดข้อผิดพลาดในการส่งแบบทดสอบ!',
      });
    }
  }

  async getAvg(): Promise<Avgs | undefined> {
    const userCout = await this.userService.countUser();

    const lessCount = await this.lessonRepositoy.count({
      where: { text: Not('') },
    });
    const full = await this.lessonRepositoy.count();
    const avg = { ansCount: lessCount, userCout: userCout, ansFull: full };
    // console.log(avg);

    return avg;
  }

  async countLesson(email: string): Promise<number | any> {
    const count = await this.lessonRepositoy
      .query(
        "SELECT COUNT(user_email) as counts FROM `lesson` WHERE user_email = ? AND text != ''",
        [email],
      )
      .then((value) => value[0].counts)
      .catch((e) => new HttpException('ไม่พบข้อมูลการทำแบบทดสอบ', 404));
    return count;
  }
  async findDetail(): Promise<LessonDetail[] | null> {
    return await this.lessonRepositoy
      .query(
        'SELECT user.email,user.name,user.create_at, lesson.send_at,ROUND(AVG(TIMESTAMPDIFF(SECOND, user.create_at,lesson.send_at)) / 3600,0) as avgtime, (SELECT COUNT(user_email) FROM lesson WHERE text != "" AND user_email = user.email) as counter FROM lesson  INNER JOIN user ON(user.email = lesson.user_email) GROUP BY user_email',
      )
      .then((value: LessonDetail[]) => value)
      .catch((e) => {
        throw new BadRequestException('เกิดข้อผิดพลาดในการค้นหาข้อมูล');
      });
  }

  async remove(id: number): Promise<void> {
    await this.lessonRepositoy.delete(id);
  }
}
