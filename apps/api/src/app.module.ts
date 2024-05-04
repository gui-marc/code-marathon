import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehicleService } from './vehicle/vehicle.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { PrismaModule } from 'nestjs-prisma';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ReviewModule,
  ],
  controllers: [
    AppController,
    AuthController,
    VehicleController,
    ReviewController,
  ],
  providers: [AppService, AuthService, VehicleService, ReviewService],
})
export class AppModule {}
