import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { EmailModule } from 'src/email/email.module';
import { TaskCheckerService } from './task-checker.service';

@Module({
  imports: [EmailModule],
  controllers: [TaskController],
  providers: [TaskService, TaskCheckerService],
})
export class TaskModule {}
