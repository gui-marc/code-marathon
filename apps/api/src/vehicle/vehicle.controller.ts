import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'prisma/prisma-client';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/:id')
  getVehicle(@Param('id') id: number) {
    return this.vehicleService.getVehicle(id);
  }

  @Post('/create')
  createVehicle(@Body() vehicle: Vehicle) {
    return this.vehicleService.createVehicle(vehicle.ownerId, vehicle);
  }
}
