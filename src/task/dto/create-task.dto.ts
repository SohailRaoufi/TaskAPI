import {IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator"
import {Type} from "class-transformer"
import { Status } from "@prisma/client";



export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Task title must be at least 3 characters long' })
    taskName: string;

    @IsString()
    @IsOptional()
    taskDetail: string;

    @IsEnum(Status)
    @IsOptional()
    status: Status;

    @IsInt()
    @IsNotEmpty()
    category_id:number

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    due_date: Date
}