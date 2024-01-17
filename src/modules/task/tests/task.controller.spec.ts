import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { TaskController } from '../task.controller';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskService } from '../task.service';
import { TaskStatus } from '../task.type';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        AuthService,
        JwtService,
        PrismaService,
        TaskService,
        UserService,
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllTasks', () => {
    it('should return an array of tasks', async () => {
      const result = {
        tasks: [
          {
            id: '172d7d82-af2c-4066-a07a-321f808955c0',
            title: 'Candidate 1',
            description: 'Lorem',
            status: 'To Do',
            created_at: new Date('2024-01-17T17:33:16.694Z'),
            created_by: {
              id: 'f8989020-93f2-4cfb-9b25-156369492a39',
              name: 'Tony',
              email: 'tony@avenger.team',
            },
          },
        ],
        total: 1,
      };

      jest
        .spyOn(controller, 'findAllTasks')
        .mockImplementation(async () => result);

      expect(await controller.findAllTasks({ page: '1', limit: '10' })).toBe(
        result,
      );
    });
  });

  describe('findTask', () => {
    it('should return a task', async () => {
      const result = {
        task: {
          id: '172d7d82-af2c-4066-a07a-321f808955c0',
          title: 'Candidate 1',
          description: 'Lorem',
          status: 'To Do',
          created_at: new Date('2024-01-17T17:33:16.694Z'),
          created_by: {
            id: 'f8989020-93f2-4cfb-9b25-156369492a39',
            name: 'Tony',
            email: 'tony@avenger.team',
          },
        },
      };

      jest.spyOn(controller, 'findTask').mockImplementation(async () => result);

      expect(
        await controller.findTask('172d7d82-af2c-4066-a07a-321f808955c0'),
      ).toBe(result);
    });
  });

  describe('createTask', () => {
    it('should return an empty', async () => {
      const result = undefined;

      jest
        .spyOn(controller, 'createTask')
        .mockImplementation(async () => result);

      expect(
        await controller.createTask(
          {},
          {
            title: 'Candidate 1',
            description: 'Lorem',
          },
        ),
      ).toBe(result);
    });
  });

  describe('updateTask', () => {
    it('should return an empty', async () => {
      const result = undefined;

      jest
        .spyOn(controller, 'updateTask')
        .mockImplementation(async () => result);

      expect(
        await controller.updateTask(
          {},
          '172d7d82-af2c-4066-a07a-321f808955c0',
          {
            status: TaskStatus.DONE,
            description: '',
            is_archived: false,
          },
        ),
      ).toBe(result);
    });
  });

  describe('deleteTask', () => {
    it('should return an empty', async () => {
      const result = undefined;

      jest
        .spyOn(controller, 'deleteTask')
        .mockImplementation(async () => result);

      expect(
        await controller.deleteTask('172d7d82-af2c-4066-a07a-321f808955c0'),
      ).toBe(result);
    });
  });

  describe('findAllComments', () => {
    it('should return an array of comments', async () => {
      const result = {
        comments: [
          {
            id: '172d7d82-af2c-4066-a07a-321f808955c0',
            comment: 'Lorem',
            created_at: new Date('2024-01-17T17:33:16.694Z'),
            created_by: {
              id: 'f8989020-93f2-4cfb-9b25-156369492a39',
              name: 'Tony',
              email: 'tony@avenger.team',
            },
          },
        ],
        total: 1,
      };

      jest
        .spyOn(controller, 'findAllComments')
        .mockImplementation(async () => result);

      expect(
        await controller.findAllComments(
          '172d7d82-af2c-4066-a07a-321f808955c0',
          { page: '1', limit: '10' },
        ),
      ).toBe(result);
    });
  });

  describe('createComment', () => {
    it('should return an empty', async () => {
      const result = undefined;

      jest
        .spyOn(controller, 'createComment')
        .mockImplementation(async () => result);

      expect(
        await controller.createComment(
          {},
          '172d7d82-af2c-4066-a07a-321f808955c0',
          {
            comment: 'Lorem',
          },
        ),
      ).toBe(result);
    });
  });

  describe('updateComment', () => {
    it('should return an empty', async () => {
      const result = undefined;

      jest
        .spyOn(controller, 'updateComment')
        .mockImplementation(async () => result);

      expect(
        await controller.updateComment(
          {},
          '172d7d82-af2c-4066-a07a-321f808955c0',
          '172d7d82-af2c-4066-a07a-321f808955c0',
          {
            comment: 'Lorem',
          },
        ),
      ).toBe(result);
    });
  });

  describe('deleteComment', () => {
    it('should return an empty', async () => {
      const result = undefined;

      jest
        .spyOn(controller, 'deleteComment')
        .mockImplementation(async () => result);

      expect(
        await controller.deleteComment(
          {},
          '172d7d82-af2c-4066-a07a-321f808955c0',
          '172d7d82-af2c-4066-a07a-321f808955c0',
        ),
      ).toBe(result);
    });
  });

  describe('findAllChangelogs', () => {
    it('should return an array of changelogs', async () => {
      const result = {
        changelogs: [
          {
            id: '172d7d82-af2c-4066-a07a-321f808955c0',
            title: 'Candidate 1',
            description: 'Lorem',
            status: 'To Do',
            created_at: new Date('2024-01-17T17:33:16.694Z'),
            created_by: {
              id: 'f8989020-93f2-4cfb-9b25-156369492a39',
              name: 'Tony',
              email: 'tony@avenger.team',
            },
          },
        ],
        total: 1,
      };

      jest
        .spyOn(controller, 'findAllChangelogs')
        .mockImplementation(async () => result);

      expect(
        await controller.findAllChangelogs(
          '172d7d82-af2c-4066-a07a-321f808955c0',
          { page: '1', limit: '10' },
        ),
      ).toBe(result);
    });
  });
});
