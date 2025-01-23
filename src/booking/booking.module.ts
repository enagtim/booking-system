import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModel, BookingModelSchema } from './models/booking.model';
import { RoomModel, RoomModelSchema } from '../room/models/room.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: BookingModel.name, schema: BookingModelSchema },
			{ name: RoomModel.name, schema: RoomModelSchema },
		]),
	],
	controllers: [BookingController],
	providers: [BookingService],
})
export class BookingModule {}
