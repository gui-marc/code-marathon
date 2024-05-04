import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { z } from 'zod';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserbyId(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: unknown) {
    const schema = z.object({
      istId: z.string().min(1),
      name: z.string().min(1),
      email: z.string().email(),
    });

    const parsedData = schema.safeParse(data);

    if (!parsedData.success) {
      throw new Error('Invalid data');
    }

    return this.prisma.user.create({
      data: parsedData.data as {
        istId: string;
        name: string;
        email: string;
      },
    });
  }
}
