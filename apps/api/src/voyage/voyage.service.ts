import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { z } from 'zod';

@Injectable()
export class VoyageService {
  constructor(private readonly prisma: PrismaService) {}

  async getVoyage(voyageId: number) {
    return this.prisma.voyage.findUnique({
      where: {
        id: voyageId,
      },
      include: {
        vehicle: true,
        driver: true,
        passengers: true,
      },
    });
  }

  getUserVoyages(userId: number) {
    return this.prisma.voyage.findMany({
      where: {
        driverId: userId,
      },
      include: {
        vehicle: true,
        driver: true,
        passengers: true,
      },
    });
  }

  getAvailableVoyages() {
    //Should return all voyages with available seats
    const voyages = this.prisma.voyage.findMany({
      include: {
        vehicle: true,
        driver: true,
        passengers: true,
      },
    });

    return voyages.filter((voyage) => {
      return voyage.seats > voyage.passengers.length;
    });
  }

  createVoyage(userId: number, vehicleId: number, data: unknown) {
    const schema = z.object({
      from: z.string().min(1),
      to: z.string().min(1),
      distance: z.string().min(1),
      seats: z.number().min(1),
    });

    const parsedData = schema.safeParse(data);

    if (!parsedData.success) {
      throw new Error('Invalid data');
    }

    return this.prisma.voyage.create({
      data: {
        ...(parsedData.data as {
          from: string;
          to: string;
          distance: string;
          seats: number;
        }),
        driver: {
          connect: {
            id: userId,
          },
        },
        vehicle: {
          connect: {
            id: vehicleId,
          },
        },
      },
    });
  }
}
