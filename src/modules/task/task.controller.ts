import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  CreateCommentDto,
  CreateTaskDto,
  ListAllChangelogsFilterDto,
  ListAllCommentFilterDto,
  ListAllTaskFilterDto,
  UpdateCommentDto,
  UpdateTaskDto,
} from './task.dto';
import { TaskService } from './task.service';
import { ListAllTaskItem, TaskItem, UserItem } from './task.type';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async findAllTasks(@Query() query: ListAllTaskFilterDto) {
    const [results, count] = await this.taskService.findAllTasks(query);

    const tasks: ListAllTaskItem[] = results.map((task) => {
      const user: UserItem = {
        id: task.user?.id ?? '',
        name: task.user?.name ?? '',
        email: task.user?.email ?? '',
      };

      return {
        id: task.id ?? '',
        title: task.title ?? '',
        description: task.description ?? '',
        status: task.status ?? '',
        created_at: task.createdAt ?? new Date(),
        created_by: user,
      };
    });

    return {
      tasks: tasks,
      total: count,
    };
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AuthGuard)
  async findTask(@Param('id') taskId: string) {
    const result = await this.taskService.findTask(taskId);

    const user: UserItem = {
      id: result.user?.id ?? '',
      name: result.user?.name ?? '',
      email: result.user?.email ?? '',
    };

    const task: TaskItem = {
      id: result.id ?? '',
      title: result.title ?? '',
      description: result.description ?? '',
      status: result.status ?? '',
      created_at: result.createdAt ?? new Date(),
      created_by: user,
    };

    return { task: task };
  }

  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Request() req: any, @Body() createTaskDto: CreateTaskDto) {
    const userId = req.user.sub;

    await this.taskService.createTask(userId, createTaskDto);
  }

  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateTask(
    @Request() req: any,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const userId = req.user.sub;

    await this.taskService.updateTask(userId, taskId, updateTaskDto);
  }

  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteTask(@Param('id') taskId: string) {
    await this.taskService.deleteTask(taskId);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/:id/comments')
  async findAllComments(
    @Param('id') taskId: string,
    @Query() query: ListAllCommentFilterDto,
  ) {
    const [results, count] = await this.taskService.findAllComments(
      taskId,
      query,
    );

    const comments = results.map((comment) => {
      const user: UserItem = {
        id: comment.user?.id ?? '',
        name: comment.user?.name ?? '',
        email: comment.user?.email ?? '',
      };

      return {
        id: comment.id ?? '',
        comment: comment.comment ?? '',
        created_at: comment.createdAt ?? new Date(),
        created_by: user,
      };
    });

    return { comments: comments, total: count };
  }

  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post('/:id/comments')
  async createComment(
    @Request() req: any,
    @Param('id') taskId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = req.user.sub;

    await this.taskService.createComment(userId, taskId, createCommentDto);
  }

  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Patch('/:id/comments/:commentId')
  async updateComment(
    @Request() req: any,
    @Param('id') taskId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = req.user.sub;

    await this.taskService.updateComment(
      userId,
      taskId,
      commentId,
      updateCommentDto,
    );
  }

  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete('/:id/comments/:commentId')
  async deleteComment(
    @Request() req: any,
    @Param('id') taskId: string,
    @Param('commentId') commentId: string,
  ) {
    const userId = req.user.sub;

    await this.taskService.deleteComment(userId, taskId, commentId);
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('/:id/changelogs')
  async findAllChangelogs(
    @Param('id') taskId: string,
    @Query() query: ListAllChangelogsFilterDto,
  ) {
    const [results, count] = await this.taskService.findAllChangelogs(
      taskId,
      query,
    );

    const changelogs = results.map((changelog) => {
      const user: UserItem = {
        id: changelog.user?.id ?? '',
        name: changelog.user?.name ?? '',
        email: changelog.user?.email ?? '',
      };

      return {
        id: changelog.id ?? '',
        title: changelog.title ?? '',
        description: changelog.description ?? '',
        status: changelog.status ?? '',
        created_at: changelog.createdAt ?? new Date(),
        created_by: user,
      };
    });

    return { changelogs: changelogs, total: count };
  }
}
