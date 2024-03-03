import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategies';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategies';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [AuthService, LocalStrategy, JwtService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  imports: [ConfigModule, PassportModule, UsersModule],
})
export class AuthModule {}
