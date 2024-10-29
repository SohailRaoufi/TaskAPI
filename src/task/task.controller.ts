import { Controller, Post, Body, Get } from '@nestjs/common';
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
}
