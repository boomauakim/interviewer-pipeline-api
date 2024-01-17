import { Body, Controller, HttpCode, Post, Version } from '@nestjs/common';
import { CreateTaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Version('1')
  @HttpCode(201)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.taskService.create(createTaskDto);
  }
}
