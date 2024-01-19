import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCommentDto,
  CreateTaskDto,
  ListAllChangelogsFilterDto,
  ListAllCommentFilterDto,
  ListAllTaskFilterDto,
  UpdateCommentDto,
  UpdateTaskDto,
} from './task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAllTasks(query: ListAllTaskFilterDto) {
    const page = Number(query?.page ?? 1);
    const limit = Number(query?.limit ?? 10);

    const skip = (page - 1) * limit;

    const isArchived = query?.is_archived == 'true' ?? false;

    return this.prisma.$transaction([
      this.prisma.task.findMany({
        where: {
          isArchived: isArchived,
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
          isArchived: isArchived,
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

  async createTask(userId: string, task: CreateTaskDto) {
    const result = await this.prisma.task.create({
      data: {
        userId: userId,
        title: task.title,
        description: task.description,
      },
    });

    await this.prisma.taskChangelog.create({
      data: {
        taskId: result.id,
        userId: userId,
        title: result.title,
        description: 'Task created',
        status: result.status,
      },
    });
  }

  async updateTask(userId: string, taskId: string, task: UpdateTaskDto) {
    const expectedTask = await this.findTask(taskId);

    const result = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        description: task.description ?? expectedTask.description,
        status: task.status ?? expectedTask.status,
        isArchived: task.is_archived ?? expectedTask.isArchived,
      },
    });

    await this.prisma.taskChangelog.create({
      data: {
        taskId: result.id,
        userId: userId,
        title: result.title,
        description: 'Task updated',
        status: result.status,
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
        orderBy: {
          createdAt: 'desc',
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

  async findComment(commentId: string) {
    const comment = await this.prisma.taskComment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment not found`);
    }

    return comment;
  }

  async createComment(
    userId: string,
    taskId: string,
    comment: CreateCommentDto,
  ) {
    const task = await this.findTask(taskId);

    await this.prisma.$transaction([
      this.prisma.taskComment.create({
        data: {
          taskId: taskId,
          userId: userId,
          comment: comment.comment,
        },
      }),
      this.prisma.taskChangelog.create({
        data: {
          taskId: task.id,
          userId: userId,
          title: task.title,
          description: 'Comment created',
          status: task.status,
        },
      }),
    ]);
  }

  async updateComment(
    userId: string,
    taskId: string,
    commentId: string,
    comment: UpdateCommentDto,
  ) {
    const task = await this.findTask(taskId);

    const expectedComment = await this.findComment(commentId);

    if (expectedComment.userId != userId) {
      throw new ForbiddenException(`You can't update this comment`);
    }

    try {
      await this.prisma.$transaction([
        this.prisma.taskComment.update({
          where: {
            taskId: taskId,
            id: commentId,
          },
          data: {
            comment: comment.comment,
          },
        }),
        this.prisma.taskChangelog.create({
          data: {
            taskId: task.id,
            userId: userId,
            title: task.title,
            description: 'Comment updated',
            status: task.status,
          },
        }),
      ]);
    } catch (e) {
      if (e.code == 'P2025') {
        throw new NotFoundException(`Comment not found`);
      }
    }
  }

  async deleteComment(userId: string, taskId: string, commentId: string) {
    const task = await this.findTask(taskId);

    const expectedComment = await this.findComment(commentId);

    if (expectedComment.userId != userId) {
      throw new ForbiddenException(`You can't delete this comment`);
    }

    try {
      await this.prisma.$transaction([
        this.prisma.taskComment.delete({
          where: {
            taskId: taskId,
            id: commentId,
          },
        }),
        this.prisma.taskChangelog.create({
          data: {
            taskId: task.id,
            userId: userId,
            title: task.title,
            description: 'Comment deleted',
            status: task.status,
          },
        }),
      ]);
    } catch (e) {
      if (e.code == 'P2025') {
        throw new NotFoundException(`Comment not found`);
      }
    }
  }

  async findAllChangelogs(taskId: string, query: ListAllChangelogsFilterDto) {
    const page = Number(query?.page ?? 1);
    const limit = Number(query?.limit ?? 10);

    const skip = (page - 1) * limit;

    await this.findTask(taskId);

    return this.prisma.$transaction([
      this.prisma.taskChangelog.findMany({
        where: {
          taskId: taskId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: skip,
        take: limit,
        include: {
          user: true,
        },
      }),
      this.prisma.taskChangelog.count({
        where: {
          taskId: taskId,
        },
      }),
    ]);
  }
}
