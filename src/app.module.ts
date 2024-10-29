import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal:true}), TaskModule]
})
export class AppModule {}
