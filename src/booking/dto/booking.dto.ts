import { Type } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
export enum BookingStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	REJECTED = 'rejected',
}
export class IBookingModelDTO {
	@IsString()
	room_id: string;

	@IsDate()
	@Type(() => Date)
	bookingDate: Date;

	@IsString()
	status?: BookingStatus;
}
