import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: true,
      },
    });
  }

  async create(task: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: task.title,
        description: task.title,
        status: TaskStatus.TO_DO,

  async update(taskId: string, task: UpdateTaskDto) {
    const expectedTask = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!expectedTask) {
      throw new NotFoundException(`Task not found`);
    }

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        description: task.description ?? expectedTask.description,
        status: task.status ?? expectedTask.status,
        isArchived: task.is_archived ?? expectedTask.isArchived,
      },
    });
  }

  async delete(taskId: string) {
    try {
      await this.prisma.task.delete({
        where: {
          id: taskId,
        },
      });
    } catch (e) {
      if (e.code == 'P2025') {
        throw new NotFoundException(`Task not found`);
      }
    }
  }
}
