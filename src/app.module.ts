import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/booking-api?authSource=admin'),
		RoomModule,
		BookingModule,
	],
})
export class AppModule {}
