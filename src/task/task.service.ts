import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

interface TaskResponse {
    success: boolean;
    data?: any;
    message?: string;
}

@Injectable()
export class TaskService {
    constructor(private readonly prisma:PrismaService){}
    async create(taskdto: CreateTaskDto): Promise<TaskResponse>{
        try{
        const task = await this.prisma.task.create({
            data:{
                ...taskdto,
                userId:1
            }
        });

        return {
            success: true,
            data:task
        };
        }catch(e){
            if(e.code === "P2002"){
                return {success:false,"message": "Task Already Exists!"};
            }else if(e.code === "P2003"){
                return {success:false,"message":`${e.meta.field_name} not exsits!`};
            }
            return e
        }

    }

    async findall():Promise<TaskResponse>{
        const allTasks = await this.prisma.task.findMany({
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

    async findone(id:number):Promise<TaskResponse>{
        const task = await this.prisma.task.findUnique({
            where:{
                id:id
            }
        })

        if(!task){
            throw new NotFoundException("Task Not Found!");
        }

        return {success: true, data: task};
    }

    async update(id:number, updatedTask:UpdateTaskDto):Promise<TaskResponse>{
        const existingTask = await this.prisma.task.findUnique({
            where: { id: id },
        });
        if(!existingTask){
            throw new NotFoundException("Task Not Found!");
        }
        try{
        const {userId, ...updateTask} = updatedTask;
        const task = await this.prisma.task.update({
            where:{id:id},
            data:updateTask,
        })

        return {success: true, data: task};
        }catch(e){
            if(e.code === "P2002"){
                return {success: false, message: "Task name Already Exists!"};
            }
        }
    }

    async delete(id:number):Promise<TaskResponse>{
        try{
        const task = await this.prisma.task.delete({
            where:{
                id:id
            }
        })
        return {success: true, message: "Task Deleted Successfully!"};
        }catch(e){
            return {success: false, message:e};
        }
    }
}
