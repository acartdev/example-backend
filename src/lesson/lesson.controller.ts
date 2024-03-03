import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuards } from 'src/auth/guards/jwt-auth.guards';
import { Role } from 'src/users/entities/userType';
import { Roles } from 'src/auth/strategies/roles.decorator';
import { LessonDetail } from './dto/detail.dto';
import { Avgs } from './dto/avg.dto';
import { LessonType } from './dto/lesson-detail.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @UseGuards(JwtAuthGuards)
  @Roles(Role.user)
  create(@Body() createLessonDto: CreateLessonDto[]) {
    return this.lessonService.create(createLessonDto);
  }
  @Get('')
  @UseGuards(JwtAuthGuards)
  @Roles(Role.admin)
  async findeDetail(): Promise<LessonDetail[] | null> {
    return this.lessonService.findDetail();
  }
  @Get('avg')
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuards)
  async countAvg(): Promise<Avgs | null> {
    // console.log('ge');
    // const avg = { ansCount: 1, userCout: 2, ansFull: 3 };
    return await this.lessonService.getAvg();
    // return avg;
  }

  @Get(':email')
  @UseGuards(JwtAuthGuards)
  @Roles(Role.admin)
  async getLessonDetail(
    @Param('email') email: string,
  ): Promise<LessonType[] | null> {
    return this.lessonService.findeLesson(email);
    // return ['hello'];
  }

  @Get('count/:email')
  @UseGuards(JwtAuthGuards)
  async countLesson(@Param('email') email: string): Promise<number> {
    return await this.lessonService.countLesson(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
