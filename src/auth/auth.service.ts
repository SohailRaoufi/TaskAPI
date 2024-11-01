import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService, private readonly config:ConfigService, private readonly jwt:JwtService){} 

    async signup(dto:AuthDto){
        try{
        if (!dto.name) {
            dto.name = dto.email.split('@')[0];
        }
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.user.create({data:{
            email:dto.email,
            password_hash:hash,
            name:dto.name
        }});

        return this.signToken(user.id, user.email);
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === "P2002"){
                throw new ForbiddenException("Credentials taken");
            }
        }
        throw error;
        }
    }


    async signin(dto: AuthDto) {
        // Find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        // If user doesn't exist throw exception
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }

        // Compare passwords
        const passwordMatches = await argon.verify(user.password_hash, dto.password);

        // If password incorrect throw exception
        if (!passwordMatches) {
            throw new ForbiddenException('Invalid credentials'); 
        }

        return this.signToken(user.id, user.email);
    }


    async signToken(userId:number, email:string):Promise<{access_token:string}>{
        const payload = {
            sub:userId,
            email
        }

        const token = await this.jwt.signAsync(payload,{
            expiresIn:"15m",
            secret:this.config.get("SECRET_KEY") 
        })
        return {"access_token":token};
    }
}
