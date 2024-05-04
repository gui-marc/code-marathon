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
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { VoyageService } from './voyage/voyage.service';
import { VoyageModule } from './voyage/voyage.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    ReviewModule,
    UserModule,
    VoyageModule,
  ],
  controllers: [
    AppController,
    AuthController,
    VehicleController,
    ReviewController,
    UserController,
  ],
  providers: [AppService, AuthService, VehicleService, ReviewService, VoyageService],
})
export class AppModule {}
