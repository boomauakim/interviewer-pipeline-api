import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTaskDto,
  ListAllCommentFilterDto,
  ListAllTaskFilterDto,
  UpdateTaskDto,
} from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAllTasks(query: ListAllTaskFilterDto) {
    const page = Number(query?.page ?? 1);
    const limit = Number(query?.limit ?? 10);

    const skip = (page - 1) * limit;

    return this.prisma.$transaction([
      this.prisma.task.findMany({
        where: {
          isArchived: false,
        },
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          user: true,
        },
        skip: skip,
        take: limit,
      }),
      this.prisma.task.count({
        where: {
          isArchived: false,
        },
      }),
    ]);
  }

  async findTask(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        user: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return task;
  }

  async createTask(task: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
      },
    });
  }

  async updateTask(taskId: string, task: UpdateTaskDto) {
    const expectedTask = await this.findTask(taskId);

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

  async deleteTask(taskId: string) {
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

  async findAllComments(taskId: string, query: ListAllCommentFilterDto) {
    const page = Number(query?.page ?? 1);
    const limit = Number(query?.limit ?? 10);

    const skip = (page - 1) * limit;

    await this.findTask(taskId);

    return this.prisma.$transaction([
      this.prisma.taskComment.findMany({
        where: {
          taskId: taskId,
        },
        include: {
          user: true,
        },
        skip: skip,
        take: limit,
      }),
      this.prisma.taskComment.count({
        where: {
          taskId: taskId,
        },
      }),
    ]);
  }

  async createComment(taskId: string, comment: CreateCommentDto) {
    await this.findTask(taskId);

    return this.prisma.taskComment.create({
      data: {
        taskId: taskId,
        comment: comment.comment,
      },
    });
  }
}
