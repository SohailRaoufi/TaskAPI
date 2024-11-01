import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class TaskCheckerService {
  private readonly logger = new Logger(TaskCheckerService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}
  
  @Cron(CronExpression.EVERY_DAY_AT_9PM)
  async checkDueTasks() {
    this.logger.log('Checking for tasks due tomorrow...');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);

    try {
      // Find tasks due tomorrow
      const dueTasks = await this.prisma.task.findMany({
        where: {
          due_date: {
            gte: tomorrow,
            lt: nextDay,
          },
          status: "InProgress",
        },
        include: {
          user: true, // Include user data for email
        },
      });

      // Send notifications for each task
      for (const task of dueTasks) {
        try {
          await this.emailService.sendTaskReminder(
            task.user.email,
            task.taskName,
            task.due_date,
          );
          this.logger.log(`Reminder sent for task: ${task.id}`);
        } catch (error) {
          this.logger.error(
            `Failed to send reminder for task ${task.id}: ${error.message}`,
          );
        }
      }
    } catch (error) {
      this.logger.error(`Failed to check due tasks: ${error.message}`);
    }
  }
}