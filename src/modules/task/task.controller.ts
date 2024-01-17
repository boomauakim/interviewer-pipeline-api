import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';
import { ListAllTaskItem, TaskStatusTitle } from './task.type';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Version('1')
  @HttpCode(200)
  @Get()
  async findAll() {
    const results = await this.taskService.findAll();

    const taksRep: ListAllTaskItem[] = results.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        status: TaskStatusTitle[task.status],
        created_by: task.user.name,
        created_at: task.createdAt,
      };
    });

    return {
      tasks: taksRep,
    };
  }

  @Version('1')
  @HttpCode(201)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.taskService.create(createTaskDto);
  }

  @Version('1')
  @HttpCode(204)
  @Patch('/:id')
  async update(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.taskService.update(taskId, updateTaskDto);
  }

  @Version('1')
  @HttpCode(204)
  @Delete('/:id')
  async delete(@Param('id') taskId: string) {
    await this.taskService.delete(taskId);
  }
}
