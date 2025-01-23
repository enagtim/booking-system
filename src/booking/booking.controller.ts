import {
	Controller,
	Post,
	Body,
	HttpCode,
	Get,
	Patch,
	Delete,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingStatus, IBookingModelDTO } from './dto/booking.dto';
import { BookingModel } from './models/booking.model';

@Controller('booking')
export class BookingController {
	constructor(private readonly bookingService: BookingService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	@HttpCode(201)
	public async createBooking(@Body() dto: IBookingModelDTO): Promise<BookingModel> {
		return this.bookingService.create(dto);
	}
	@Get('all')
	@HttpCode(200)
	public async getAllBooking(): Promise<BookingModel[]> {
		return this.bookingService.getAll();
	}
	@Get('get/:id')
	@HttpCode(200)
	public async getBookingById(@Query('id') id: string): Promise<BookingModel> {
		return this.bookingService.getById(id);
	}
	@Patch('update/:id')
	@HttpCode(200)
	public async updateBooking(
		@Query('id') id: string,
		@Body() dto: Partial<IBookingModelDTO>,
	): Promise<BookingModel> {
		return this.bookingService.update(id, dto);
	}
	@Delete('delete/:id')
	@HttpCode(204)
	public async delete(
		@Query('id') id: string,
		@Query('status') status: BookingStatus.REJECTED,
	): Promise<void> {
		await this.bookingService.delete(id, status);
	}
}
