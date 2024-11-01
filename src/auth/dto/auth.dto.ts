import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class AuthDto {
    


    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Password must contain at least one letter and one number'
    })
    password: string;

    @IsString({ message: 'Name must be a string' })
    @IsOptional()
    name?: string;
}

