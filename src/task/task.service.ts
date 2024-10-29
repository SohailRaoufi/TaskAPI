import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(private readonly prisma:PrismaService){}
    async create(taskdto: CreateTaskDto){
        try{
        const task = await this.prisma.task.create({
            data:{
                ...taskdto,
                userId:1
            }
        });

        return task;
        }catch(e){
            if(e.code === "P2002"){
                return {"Exists": "Task Already Exists!"};
            }else if(e.code === "P2003"){
                return {"Field Error":`${e.meta.field_name} not exsits!`};
            }
            return e
        }

    }

    async findall(){
        const allTasks = await this.prisma.task.findMany({
            include:{
                category:{
                    select:{
                        name:true
                    }
                }
            }
        });

        return {"Success":true,"data":allTasks};
    }

    async findone(id:number){
        const task = await this.prisma.task.findUnique({
            where:{
                id:id
            }
        })

        if(!task){
            return {
                "Success": false,
                "Msg":"Task Not Found!",
            }
        }

        return {"Success": true, "data": task};
    }

    async update(id:number, updatedTask:UpdateTaskDto){
        const existingTask = await this.prisma.task.findUnique({
            where: { id: id },
        });
        if(!existingTask){
            return {"Success": false, "Msg":"Task Not Found!"};
        }
        try{
        delete updatedTask.userId; // remove the userId.
        const task = await this.prisma.task.update({
            where:{id:id},
            data:updatedTask,
        })

        return {"Success": true, "data": task};
        }catch(e){
            if(e.code === "P2002"){
                return {"Success": false, "Msg": "Task name Already Exists!"};
            }
        }
    }

    async delete(id:number){
        try{
        const task = await this.prisma.task.delete({
            where:{
                id:id
            }
        })
        return {"Success": true, "Msg": "Task Deleted Successfully!"};
        }catch(e){
            return {"Success": false, "Msg":e};
        }
    }
}
