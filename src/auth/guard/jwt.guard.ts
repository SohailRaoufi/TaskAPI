import { AuthGuard } from "@nestjs/passport";


// we write this class az an custom guard to make abstract so we dont use AuthGuard("jwt") everytime.
export class JwtGuard extends AuthGuard("jwt") {
    constructor(){
        super();
    }
}