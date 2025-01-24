import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/booking-api?authSource=admin'),
		RoomModule,
		BookingModule,
		AuthModule,
	],
})
export class AppModule {}
