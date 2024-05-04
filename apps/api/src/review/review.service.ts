import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsersReviews(userId: number, page: number, perPage: number) {
    return this.prisma.review.findMany({
      where: {
        userId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });
  }

  async createReview(userId: number, voyageId: number, data: unknown) {
    const schema = z.object({
      rating: z.number().min(1).max(5),
      comment: z.string().min(1).max(255).optional(),
      isDriver: z.boolean(),
    });

    const parsedData = schema.safeParse(data);

    if (!parsedData.success) {
      throw new Error('Invalid data');
    }

    return this.prisma.review.create({
      data: {
        ...(parsedData.data as {
          rating: number;
          comment?: string;
          isDriver: boolean;
        }),
        user: {
          connect: {
            id: userId,
          },
        },
        voyage: {
          connect: {
            id: voyageId,
          },
        },
      },
    });
  }
}
