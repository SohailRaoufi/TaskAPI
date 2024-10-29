import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private readonly prisma:PrismaService){}
    async create(taskdto: CreateTaskDto){
        try{
        const task = await this.prisma.task.create({
            data:{
                taskName:taskdto.taskName,
                taskDetail:taskdto.taskDetail,
                due_date:taskdto.due_date,
                category_id:taskdto.category_id,
                status:taskdto.status,
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
