import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    try {
      const user = await this.userService.findOne(username, password);

      if (!user) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async signUp(signUpDto: SignUpDto) {
    return this.userService.create(signUpDto);
  }
}
