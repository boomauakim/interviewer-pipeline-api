import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUser } from './user.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return user;
      }
    }

    return null;
  }

  async create(user: CreateUser) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    try {
      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: passwordHash,
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
    }
  }
}
