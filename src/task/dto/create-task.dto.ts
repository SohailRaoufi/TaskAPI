import {IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator"
import {Type} from "class-transformer"
import { Status } from "@prisma/client";



export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    taskName: string;

    @IsString()
    @IsOptional()
    taskDetail: string;

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;

    @IsInt()
    @IsNotEmpty()
    category_id:number

    @IsInt()
    @IsOptional()
    userId: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    due_date: Date
}