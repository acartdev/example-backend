import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const email: string = createUserDto.email;
      const exist = await this.userRepository.findOneBy({ email });
      if (exist) {
        throw new ConflictException();
      }
      createUserDto.password = await bcypt.hashSync(createUserDto.password, 12);
      return await this.userRepository.save(createUserDto);
    } catch (e) {
      throw new ConflictException({
        message: 'บัญชีนี้ถูกลงทะเบียนไปแล้ว!!',
      });
    }
  }
  async countUser(): Promise<number | null> {
    return await this.userRepository.count();
  }
  async updateStatus(email: string): Promise<boolean> {
    const res = await this.userRepository.update(email, { isActive: true });
    return res.affected === 1 ? true : false;
  }
  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }
}
