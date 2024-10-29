import { IsOptional, IsString, IsInt, IsDate, IsIn, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    taskName?: string;

    @IsString()
    @IsOptional()
    taskDetail?: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsInt()
    @IsOptional()
    category_id?: number;

    @IsInt()
    @IsOptional()
    userId?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    due_date?: Date;
}
