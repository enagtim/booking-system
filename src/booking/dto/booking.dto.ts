import { Type } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
export type BookingStatus = 'pending' | 'completed' | 'rejected';
export class IBookingModelDTO {
	@IsString()
	room_id: string;

	@IsDate()
	@Type(() => Date)
	bookingDate: Date;

	@IsString()
	status?: BookingStatus;
}
