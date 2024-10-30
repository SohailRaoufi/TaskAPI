import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TaskResponse } from 'src/shared/interfaces/taskresponse.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma:PrismaService){}
  async create(createCategoryDto: CreateCategoryDto): Promise<TaskResponse> {
    try{
    const category = await this.prisma.category.create({
      data:createCategoryDto,
    });

    return {
      success:true,
      data:category
    }
  }catch(e){
    if(e.code === "P2002"){
      return {success:false,"message": "Task Already Exists!"};
    }
  }
    
  }

  async findAll(): Promise<TaskResponse> {
    const allCategories = await this.prisma.category.findMany();

    return {
      success: true,
      data:allCategories
    }
    
  }

  async findOne(id: number): Promise<TaskResponse> {
    const category = await this.prisma.category.findUnique({
      where:{
        id:id
      }
    })

    if(!category){
      return {
        success: false,
        message: "Category Not Found!"
      }
    }


    return {
      success: true,
      data:category
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<TaskResponse> {
    const existingCat = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if(!existingCat){
        throw new NotFoundException("Task Not Found!");
    }
    try{
    const category = await this.prisma.category.update({
        where:{id:id},
        data:updateCategoryDto,
    })

    return {success: true, data: category};
    }catch(e){
        if(e.code === "P2002"){
            return {success: false, message: "Category name Already Exists!"};
        }
    }
  }

  async remove(id: number):Promise<TaskResponse> {
    try{
      const category = await this.prisma.category.delete({
        where:{
          id:id
        }
      })

      return {
        success: true,
        message:"Category Deleted Successfully!"
      }
    }catch(e){
      if(e.code === "P2025"){
        return {success: false, message:"Category Not Exists!"};
      }
      return {success:false, message:e}
    
    }
  }
}
