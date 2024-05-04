import { Module } from '@nestjs/common';
import { VoyageController } from './voyage.controller';
import { VoyageService } from './voyage.service';

@Module({
  providers: [VoyageService],
  controllers: [VoyageController],
})
export class VoyageModule {}
