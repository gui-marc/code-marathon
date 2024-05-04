import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/:id')
  getVehicle(@Param('id') id: number) {
    return this.vehicleService.getVehicle(id);
  }
}
