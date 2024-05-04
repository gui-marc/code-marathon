import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { VoyageService } from './voyage.service';
import { Request as ExpressRequest } from 'express';

@Controller('voyage')
export class VoyageController {
  constructor(private readonly voyageService: VoyageService) {}

  @Get(':id')
  getVoyage(@Param('id') id: number) {
    return this.voyageService.getVoyage(id);
  }

  @Get('user')
  getUserVoyages(@Request() req: ExpressRequest) {
    const bearerToken = req.headers.authorization;
    const id = bearerToken.split(' ')[1];
    return this.voyageService.getUserVoyages(+id);
  }

  @Get('available')
  getAvailableVoyages() {
    return this.voyageService.getAvailableVoyages();
  }

  @Post('create')
  createVoyage(@Request() req: ExpressRequest) {
    const bearerToken = req.headers.authorization;
    const id = bearerToken.split(' ')[1];
    return this.voyageService.createVoyage(
      +id,
      req.body.vehicleId,
      req.body.data,
    );
  }
}
