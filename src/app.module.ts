import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		RoomModule,
		BookingModule,
		AuthModule,
		UsersModule,
	],
})
export class AppModule {}
