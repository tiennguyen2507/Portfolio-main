import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return {
      ...user,
      _id: String(user.id),
    };
  }

  @Post('auth/login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('api/auth/health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/info')
  async getInfo(@Request() req: any) {
    return {
      ...req.user,
      _id: String(req.user.id),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }
}
