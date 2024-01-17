import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let service: AuthService;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, PrismaService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token', async () => {
      const response = {
        access_token: 'access_token',
      };
      jest.spyOn(service, 'signIn').mockImplementation(async () => response);

      expect(
        await controller.signIn({
          email: 'tony@avenger.team',
          password: 'xacTUDleveNO',
        }),
      ).toBe(response);
    });
  });

  describe('register', () => {
    it('should return an undefined', async () => {
      jest.spyOn(service, 'signUp').mockImplementation(async () => {});

      expect(
        await controller.signUp({
          name: 'Tony',
          email: 'tony@avenger.team',
          password: 'xacTUDleveNO',
        }),
      ).toBe(undefined);
    });
  });
});
