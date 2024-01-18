import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const response = {
        id: 'f8989020-93f2-4cfb-9b25-156369492a39',
        email: 'tony@avenger.team',
        name: 'Tony',
        password:
          '$2b$10$ZeUYQOSrmr5YRVCUWyUqkOVJN4iAQlgYCuh3tORRQwbTHupCOCs0K',
        createdAt: new Date('2024-01-17 17:22:34.747'),
        updatedAt: new Date('2024-01-17 17:22:34.747'),
      } as any;
      prisma.user.findUnique = jest.fn().mockResolvedValue(response);

      expect(
        await service.findOne('f8989020-93f2-4cfb-9b25-156369492a39'),
      ).toBe(response);
    });
  });

  describe('findCredential', () => {
    it('should return a user', async () => {
      const response = {
        id: 'f8989020-93f2-4cfb-9b25-156369492a39',
        email: 'tony@avenger.team',
        name: 'Tony',
        password:
          '$2b$10$ZeUYQOSrmr5YRVCUWyUqkOVJN4iAQlgYCuh3tORRQwbTHupCOCs0K',
        createdAt: new Date('2024-01-17 17:22:34.747'),
        updatedAt: new Date('2024-01-17 17:22:34.747'),
      } as any;
      prisma.user.findUnique = jest.fn().mockResolvedValue(response);

      expect(
        await service.findCredential('tony@avenger.team', 'xacTUDleveNO'),
      ).toBe(response);
    });

    it('should return null', async () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      expect(
        await service.findCredential('tony@avenger.team', 'xacTUDleveNO'),
      ).toBe(null);
    });
  });

  describe('create', () => {
    it('should return undefined', async () => {
      prisma.user.create = jest.fn().mockResolvedValue(undefined);

      expect(
        await service.create({
          name: 'Tony',
          email: 'tony@avenger.team',
          password: 'xacTUDleveNO',
        }),
      ).toBe(undefined);
    });

    it('should throw an BadRequestException', async () => {
      prisma.user.create = jest.fn().mockRejectedValue({ code: 'P2002' });

      try {
        expect(
          await service.create({
            name: 'Tony',
            email: 'tony@avenger.team',
            password: 'xacTUDleveNO',
          }),
        ).toBe(undefined);
      } catch (e) {
        expect(e.message).toBe('Email already exists');
      }
    });
  });
});
