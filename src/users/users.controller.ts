import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/strategies/roles.decorator';
import { Role } from './entities/userType';
import { JwtAuthGuards } from 'src/auth/guards/jwt-auth.guards';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.signUp(createUserDto);
  }
  @Get(':email')
  @UseGuards(JwtAuthGuards)
  @Roles(Role.user)
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.usersService.findOne(email);
  }

  @Patch(':email')
  updateStatus(@Param('email') email: string): Promise<boolean> {
    return this.usersService.updateStatus(email);
  }
}
