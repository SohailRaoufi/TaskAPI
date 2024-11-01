import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private config:ConfigService, private readonly prisma:PrismaService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get("SECRET_KEY"),
            ignoreExpiration:false
        });
    }

    async validate(payload: {sub:number, email:string}){
        const user = await this.prisma.user.findUnique({where:{id:payload.sub}});
        delete user?.password_hash;
        return user;
    }
}