import { Transform } from 'class-transformer';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '..//../enum/booking.status.enum';
import { parseDate } from '..//../helpers/date.parse';

export class BookingModelDTO {
	@IsString()
	room_id: string;

	@Transform(({ value }) => parseDate(value))
	bookingStartDate: string | Date;

	@Transform(({ value }) => parseDate(value))
	bookingEndDate: string | Date;

	@IsOptional()
	@IsEnum(BookingStatus)
	status?: BookingStatus;
}
