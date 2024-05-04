import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  //Enable oauth2 login for the user
  async authenticate(request: Request) {
    const bearerToken = request.headers.authorization;
    const id = bearerToken.split(' ')[1];
    const user = this.prisma.user.findUnique({
      where: {
        id: +id,
      },
    });

    if (!user) throw new HttpException('Unauthorized', 401);

    return user;
  }
}
