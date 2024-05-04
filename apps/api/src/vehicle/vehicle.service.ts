import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { z } from 'zod';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async getVehicle(vehicleId: number) {
    return this.prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
      include: {
        owner: true,
      },
    });
  }

  async getVehicles(userId: number, page: number, perPage: number) {
    return this.prisma.vehicle.findMany({
      where: {
        ownerId: userId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });
  }

  async createVehicle(userId: number, data: unknown) {
    const schema = z.object({
      registrationNumber: z.string().min(1),
      model: z.string().min(1),
      year: z.number().min(1900).max(new Date().getFullYear()),
      color: z.string().min(1),
      seats: z.number().min(1),
    });

    const parsedData = schema.safeParse(data);

    if (!parsedData.success) {
      throw new Error('Invalid data');
    }

    return this.prisma.vehicle.create({
      data: {
        ...(parsedData.data as {
          registrationNumber: string;
          model: string;
          year: number;
          color: string;
          seats: number;
        }),
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
