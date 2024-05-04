import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'prisma/prisma-client';
import { Request as ExpressRequest } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly authService: AuthService,
  ) {}

  @Get('/:id')
  getVehicle(@Param('id') id: number) {
    return this.vehicleService.getVehicle(id);
  }

  @Get('/users/me')
  async getVehiclesByOwner(@Request() req: ExpressRequest) {
    const user = await this.authService.authenticate(req);
    return this.vehicleService.getVehiclesByOwner(user.id);
  }

  @Post('/create')
  async createVehicle(@Request() req: ExpressRequest, @Body() data: unknown) {
    const user = await this.authService.authenticate(req);
    return this.vehicleService.createVehicle(user.id, data);
  }
}
