import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './task.dto';
import { TaskStatus } from './task.type';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(task: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: task.title,
        description: task.title,
        status: TaskStatus.TO_DO,
      },
    });
  }
}
