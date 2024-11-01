import { Controller, Post, Body, Get, Delete, Param, Patch, UseGuards, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() taskdto: CreateTaskDto, @GetUser() user:User){
    return this.taskService.create(taskdto, user.id);
  }

  @Get()
  findAll(@GetUser() user:User, @Query() paginationQuery:PaginationQueryDto){ 
      return this.taskService.findall(user.id, paginationQuery);
  }

  @Get(":id")
  findone(@Param("id") id:string, @GetUser() user:User){
    const taskId = parseInt(id);
    return this.taskService.findone(taskId, user.id);
  }

  @Delete(":id")
  delete(@Param('id') id:string, @GetUser() user:User){
    const taskId = parseInt(id);
    return this.taskService.delete(taskId, user.id);
  }

  @Patch(":id")
  update(@Param("id") id:string, @Body() taskdto: UpdateTaskDto, @GetUser() user:User){
    const taskId = parseInt(id);
    return this.taskService.update(taskId, taskdto, user.id);
  }
}
