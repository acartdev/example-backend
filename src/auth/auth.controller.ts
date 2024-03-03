import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { AuthService } from './auth.service';
import { JwtAuthGuards } from './guards/jwt-auth.guards';
import { Roles } from './strategies/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@Request() req: any): Promise<any> {
    return this.authService.signIn(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuards)
  getProfile(@Request() req: any): Promise<any> {
    return req.user;
  }
}
