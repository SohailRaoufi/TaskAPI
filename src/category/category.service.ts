import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
