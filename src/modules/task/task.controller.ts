import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { CreateTaskDto, ListAllTaskFilterDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';
import {
  ListAllTaskItem,
  TaskItem,
  TaskStatusTitle,
  UserItem,
} from './task.type';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Version('1')
  @HttpCode(200)
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
        status: TaskStatusTitle[task.status] ?? '',
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
  @HttpCode(200)
  @Get('/:id')
  async findTask(@Param('id') taskId: string) {
    const result = await this.taskService.findTask(taskId);

    const user: UserItem = {
      id: result.user?.id ?? '',
      name: result.user?.name ?? '',
      email: result.user?.email ?? '',
    };

    const taskResp: TaskItem = {
      id: result.id ?? '',
      title: result.title ?? '',
      description: result.description ?? '',
      status: TaskStatusTitle[result.status] ?? '',
      created_at: result.createdAt ?? new Date(),
      created_by: user,
    };

    return { task: taskResp };
  }

  @Version('1')
  @HttpCode(201)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    await this.taskService.createTask(createTaskDto);
  }

  @Version('1')
  @HttpCode(204)
  @Patch('/:id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Version('1')
  @HttpCode(204)
  @Delete('/:id')
  async deleteTask(@Param('id') taskId: string) {
    await this.taskService.deleteTask(taskId);
  }
}
