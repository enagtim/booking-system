import { Type } from 'class-transformer';
import { IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '..//../enum/booking.status.enum';

export class BookingModelDTO {
	@IsString()
	room_id: string;

	@IsDate()
	@Type(() => Date)
	bookingDate: Date;

	@IsOptional()
	@IsEnum(BookingStatus)
	status?: BookingStatus;
}
