import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    logIn(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('perfil')
    @UseGuards(JwtAuthGuard)
    perfil(@Request() req: any) {
        return req.user;
    }
}