import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService, private readonly prisma:PrismaService){}

    @Post("signup")
    signup(@Body() dto:AuthDto){
        return this.authService.signup(dto);
    }

    @Post("signin")
    signin(@Body() dto:AuthDto){
        return this.authService.signin(dto);
    }
}
