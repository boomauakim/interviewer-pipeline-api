import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, PrismaService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a user', async () => {
      const response = {
        id: 'f8989020-93f2-4cfb-9b25-156369492a39',
        email: 'tony@avenger.team',
        name: 'Tony',
        password:
          '$2b$10$ZeUYQOSrmr5YRVCUWyUqkOVJN4iAQlgYCuh3tORRQwbTHupCOCs0K',
        createdAt: new Date('2024-01-18T00:00:00.000Z'),
        updatedAt: new Date('2024-01-18T00:00:00.000Z'),
      };
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => response);
      jest.spyOn(jwtService, 'signAsync').mockImplementation(async () => '');

      expect(
        await service.signIn('tony@avenger.team', 'xacTUDleveNO'),
      ).toMatchObject({ access_token: '' });
    });

    it('should throw an UnauthorizedException', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(async () => null);

      try {
        await service.signIn('tony@avenger.team', 'xacTUDleveNO');
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });

    it('should throw an UnauthorizedException', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(async () => null);
      jest.spyOn(jwtService, 'signAsync').mockImplementation(async () => '');

      try {
        await service.signIn('tony@avenger.team', 'xacTUDleveNO');
      } catch (e) {
        expect(e.message).toBe('Unauthorized');
      }
    });
  });

  describe('signUp', () => {
    it('should return an undefined', async () => {
      jest.spyOn(service, 'signUp').mockImplementation(async () => {});

      expect(
        await service.signUp({
          name: 'Tony',
          email: 'tony@avenger.team',
          password: 'xacTUDleveNO',
        }),
      ).toBe(undefined);
    });
  });
});
