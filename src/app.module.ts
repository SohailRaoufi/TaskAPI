import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal:true}), TaskModule, CategoryModule]
})
export class AppModule {}
