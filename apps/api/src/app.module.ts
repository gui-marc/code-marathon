import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleController } from './vehicle/vehicle.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, AuthController, VehicleController],
  providers: [AppService, PrismaService, AuthService, VehicleService],
})
export class AppModule {}
