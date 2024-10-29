import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() taskdto: CreateTaskDto){
    return this.taskService.create(taskdto);
  }

  @Get()
  findAll(){
    return this.taskService.findall();
  }

  @Get(":id")
  findone(@Param("id") id:string){
    const taskId = parseInt(id);
    return this.taskService.findone(taskId);
  }

  @Delete(":id")
  delete(@Param('id') id:string){
    const taskId = parseInt(id);
    return this.taskService.delete(taskId);

  }
}
