import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskStatus } from '../task.type';

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllTasks', () => {
    it('should return an array of tasks', async () => {
      const response = [
        {
          id: '172d7d82-af2c-4066-a07a-321f808955c0',
          userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
          title: 'Candidate 1',
          description: 'Lorem',
          status: 'TO_DO',
          isArchived: false,
          createdAt: '2024-01-17 17:33:16.694',
          updatedAt: '2024-01-17 17:33:16.694',
        },
      ];
      prisma.task.findMany = jest.fn().mockResolvedValue(response);
      prisma.task.count = jest.fn().mockResolvedValue(1);
      prisma.$transaction = jest.fn().mockResolvedValue([response, 1]);

      expect(await service.findAllTasks({ page: '1', limit: '10' })).toEqual([
        response,
        1,
      ]);
    });
  });

  describe('findTask', () => {
    it('should return a task', async () => {
      const response = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      prisma.task.findUnique = jest.fn().mockResolvedValue(response);

      expect(
        await service.findTask('172d7d82-af2c-4066-a07a-321f808955c0'),
      ).toBe(response);
    });
  });

  describe('createTask', () => {
    it('should return an empty', async () => {
      const response = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      prisma.task.create = jest.fn().mockResolvedValue(response);
      prisma.taskChangelog.create = jest.fn().mockResolvedValue(undefined);

      expect(
        await service.createTask('f8989020-93f2-4cfb-9b25-156369492a39', {
          title: 'Candidate 1',
          description: 'Lorem',
        }),
      ).toBe(undefined);
    });
  });

  describe('updateTask', () => {
    it('should return an empty', async () => {
      const response = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      prisma.task.update = jest.fn().mockResolvedValue(response);
      prisma.task.findUnique = jest.fn().mockResolvedValue(response);
      prisma.taskChangelog.create = jest.fn().mockResolvedValue(undefined);

      expect(
        await service.updateTask('', '172d7d82-af2c-4066-a07a-321f808955c0', {
          description: 'Lorem',
          status: TaskStatus.IN_PROGRESS,
          is_archived: false,
        }),
      ).toBe(undefined);
    });
  });

  describe('deleteTask', () => {
    it('should return an empty', async () => {
      prisma.task.delete = jest.fn().mockResolvedValue(undefined);

      expect(
        await service.deleteTask('172d7d82-af2c-4066-a07a-321f808955c0'),
      ).toBe(undefined);
    });
  });

  describe('findAllComments', () => {
    it('should return an array of comments', async () => {
      const taskResponse = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      const response = [
        {
          id: '00f8ff2f-a2cf-4bec-b643-ceb46d720cd6',
          taskId: '51635984-0d8a-418f-a558-6d01f246125f',
          userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
          comment: 'Lorem',
          createdAt: '2024-01-17 17:55:48.626',
          updatedAt: '2024-01-17 17:55:48.626',
        },
      ];
      prisma.taskComment.findMany = jest.fn().mockResolvedValue(response);
      prisma.taskComment.count = jest.fn().mockResolvedValue(1);
      prisma.task.findUnique = jest.fn().mockResolvedValue(taskResponse);
      prisma.$transaction = jest.fn().mockResolvedValue([response, 1]);

      expect(
        await service.findAllComments('172d7d82-af2c-4066-a07a-321f808955c0', {
          page: '1',
          limit: '10',
        }),
      ).toEqual([response, 1]);
    });
  });

  describe('findComment', () => {
    it('should return a comment', async () => {
      const response = [
        {
          id: '00f8ff2f-a2cf-4bec-b643-ceb46d720cd6',
          taskId: '51635984-0d8a-418f-a558-6d01f246125f',
          userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
          comment: 'Lorem',
          createdAt: '2024-01-17 17:55:48.626',
          updatedAt: '2024-01-17 17:55:48.626',
        },
      ];
      prisma.taskComment.findUnique = jest.fn().mockResolvedValue(response);

      expect(
        await service.findComment('00f8ff2f-a2cf-4bec-b643-ceb46d720cd6'),
      ).toBe(response);
    });
  });

  describe('createComment', () => {
    it('should return an empty', async () => {
      const taskResponse = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      prisma.task.findUnique = jest.fn().mockResolvedValue(taskResponse);
      prisma.taskComment.create = jest.fn().mockResolvedValue(undefined);
      prisma.taskChangelog.create = jest.fn().mockResolvedValue(undefined);
      prisma.$transaction = jest.fn().mockResolvedValue(undefined);

      expect(
        await service.createComment(
          '172d7d82-af2c-4066-a07a-321f808955c0',
          '51635984-0d8a-418f-a558-6d01f246125f',
          {
            comment: 'Lorem',
          },
        ),
      ).toBe(undefined);
    });
  });

  describe('updateComment', () => {
    it('should return an empty', async () => {
      const taskResponse = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      const response = {
        id: '00f8ff2f-a2cf-4bec-b643-ceb46d720cd6',
        taskId: '51635984-0d8a-418f-a558-6d01f246125f',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        comment: 'Lorem',
        createdAt: '2024-01-17 17:55:48.626',
        updatedAt: '2024-01-17 17:55:48.626',
      };
      prisma.task.findUnique = jest.fn().mockResolvedValue(taskResponse);
      prisma.taskComment.findUnique = jest.fn().mockResolvedValue(response);
      prisma.taskComment.update = jest.fn().mockResolvedValue(undefined);
      prisma.taskChangelog.create = jest.fn().mockResolvedValue(undefined);
      prisma.$transaction = jest.fn().mockResolvedValue(undefined);

      expect(
        await service.updateComment(
          'f8989020-93f2-4cfb-9b25-156369492a39',
          '51635984-0d8a-418f-a558-6d01f246125f',
          '00f8ff2f-a2cf-4bec-b643-ceb46d720cd6',
          {
            comment: 'Lorem',
          },
        ),
      ).toBe(undefined);
    });
  });

  describe('deleteComment', () => {
    it('should return an empty', async () => {
      const taskResponse = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      const response = {
        id: '00f8ff2f-a2cf-4bec-b643-ceb46d720cd6',
        taskId: '51635984-0d8a-418f-a558-6d01f246125f',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        comment: 'Lorem',
        createdAt: '2024-01-17 17:55:48.626',
        updatedAt: '2024-01-17 17:55:48.626',
      };
      prisma.task.findUnique = jest.fn().mockResolvedValue(taskResponse);
      prisma.taskComment.findUnique = jest.fn().mockResolvedValue(response);
      prisma.taskComment.delete = jest.fn().mockResolvedValue(undefined);
      prisma.taskChangelog.create = jest.fn().mockResolvedValue(undefined);
      prisma.$transaction = jest.fn().mockResolvedValue(undefined);

      expect(
        await service.deleteComment(
          'f8989020-93f2-4cfb-9b25-156369492a39',
          '51635984-0d8a-418f-a558-6d01f246125f',
          '00f8ff2f-a2cf-4bec-b643-ceb46d720cd6',
        ),
      ).toBe(undefined);
    });
  });

  describe('findAllChangelogs', () => {
    it('should return an array of changelogs', async () => {
      const response = [
        {
          id: '00f8ff2f-a2cf-4bec-b643-ceb46d720cd6',
          taskId: '51635984-0d8a-418f-a558-6d01f246125f',
          userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
          title: 'Candidate 1',
          description: 'Lorem',
          status: 'TO_DO',
          createdAt: '2024-01-17 17:55:48.626',
          updatedAt: '2024-01-17 17:55:48.626',
        },
      ];
      const taskResponse = {
        id: '172d7d82-af2c-4066-a07a-321f808955c0',
        userId: 'f8989020-93f2-4cfb-9b25-156369492a39',
        title: 'Candidate 1',
        description: 'Lorem',
        status: 'TO_DO',
        isArchived: false,
        createdAt: '2024-01-17 17:33:16.694',
        updatedAt: '2024-01-17 17:33:16.694',
      };
      prisma.task.findUnique = jest.fn().mockResolvedValue(taskResponse);
      prisma.taskChangelog.findMany = jest.fn().mockResolvedValue(response);
      prisma.taskChangelog.count = jest.fn().mockResolvedValue(1);
      prisma.$transaction = jest.fn().mockResolvedValue([response, 1]);

      expect(
        await service.findAllChangelogs(
          '172d7d82-af2c-4066-a07a-321f808955c0',
          {
            page: '1',
            limit: '10',
          },
        ),
      ).toEqual([response, 1]);
    });
  });
});
