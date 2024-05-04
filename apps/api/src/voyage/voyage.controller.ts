import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { VoyageService } from './voyage.service';
import { Request as ExpressRequest } from 'express';

@Controller('voyage')
export class VoyageController {
  constructor(private readonly voyageService: VoyageService) {}
}
