import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleController } from './vehicle/vehicle.controller';

@Module({
  imports: [],
  controllers: [AppController, VehicleController],
  providers: [AppService, PrismaService, VehicleService],
})
export class AppModule {}
