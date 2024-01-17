import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { TaskStatus } from './task.type';

export class ListAllTaskFilterDto {
  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  limit: string;
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsBoolean()
  is_archived: boolean;
}

export class ListAllCommentFilterDto {
  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  limit: string;
}
