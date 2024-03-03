import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { password, ...rest } = user;
        return rest;
      } else {
        throw new UnauthorizedException({
          message: 'รหัสผ่านไม่ถูกต้อง!!',
          password: true,
        });
      }
    } else {
      return null;
    }
  }
  async signIn(user: any): Promise<any> {
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
        role: user.role,
        createAt: user.create_at,
        isActive: user.isActive,
      },
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('API_KEY'),
      }),
    };
  }
}
