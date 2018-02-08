import { Controller, Post, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async createToken() {
        return await this.authService.createToken();
    }

    @Get('authorized')
    public async authorized() {
        console.log('Authorized route...');
    }
}