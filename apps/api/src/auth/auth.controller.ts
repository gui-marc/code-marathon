import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Request() req: ExpressRequest) {
    return this.authService.authenticate(req);
  }

  @Post('register')
  register(@Body() body: unknown) {
    return this.authService.register(body);
  }
}
