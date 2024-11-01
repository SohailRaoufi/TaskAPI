import { Injectable , NotFoundException, ForbiddenException} from '@nestjs/common';
import { CreateTaskDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponse } from '../shared/interfaces/taskresponse.interface';


@Injectable()
export class TaskService {
    constructor(private readonly prisma:PrismaService){}

    async create(taskdto: CreateTaskDto, userId:number): Promise<TaskResponse>{
        // Check if user already has a task with the same name
        const existingTask = await this.prisma.task.findFirst({
            where: {
                AND: [
                    { userId: userId },
                    { taskName: {
                        equals: taskdto.taskName,
                        mode: 'insensitive'
                    }}
                ]
            }
        });

        if (existingTask) {
            throw new ForbiddenException('A task with this name already exists');
        }

        // Create new task
        const task = await this.prisma.task.create({
            data: {
                ...taskdto,
                userId: userId
            }
        });

        return { success: true, data: task };

    }

    async findall(userId:number):Promise<TaskResponse>{
        const allTasks = await this.prisma.task.findMany({
            where:{
                userId:userId
            },
            include:{
                category:{
                    select:{
                        name:true
                    }
                }
            }
        });

        return {success:true,data:allTasks};
    }

    async findone(taskId: number, userId: number): Promise<TaskResponse> {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId }
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.userId !== userId) {
            throw new ForbiddenException('Access denied to this task');
        }

        return { success: true, data: task };
    }

    async update(taskId: number, dto: UpdateTaskDto, userId: number): Promise<TaskResponse> {
        // Check if task with same name exists (case insensitive)
        const existingTask = await this.prisma.task.findFirst({
            where: {
                taskName: {
                    equals: dto.taskName,
                    mode: 'insensitive'
                },
                userId: userId,
                NOT: {
                    id: taskId
                }
            }
        });

        if (existingTask) {
            throw new ForbiddenException('A task with this name already exists');
        }
        const task = await this.prisma.task.findUnique({
            where: { id: taskId }
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.userId !== userId) {
            throw new ForbiddenException('Access denied to this task');
        }

        const updatedTask = await this.prisma.task.update({
            where: { id: taskId },
            data: { ...dto, userId:userId }
        });

        return { success: true, data: updatedTask };
    }

    async delete(taskId: number, userId: number): Promise<TaskResponse> {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId }
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.userId !== userId) {
            throw new ForbiddenException('Access denied to this task');
        }

        const deletedTask = await this.prisma.task.delete({
            where: { id: taskId }
        });

        return { success: true, data: deletedTask };
    }
}
