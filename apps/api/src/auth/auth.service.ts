import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async authenticate(request: Request) {
    const bearerToken = request.headers.authorization;
    console.log(bearerToken);
    const id = bearerToken.split(' ')[1];

    const user = this.prisma.user.findUnique({
      where: {
        istId: id,
      },
    });

    if (!user) throw new HttpException('Unauthorized', 401);

    return user;
  }

  async register(body: unknown) {
    const user = await this.prisma.user.create({
      data: body as any,
    });

    return user;
  }
}
