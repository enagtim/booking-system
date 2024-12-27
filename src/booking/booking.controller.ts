import { Controller, Post, Body, HttpCode, Get, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { IBookingModelDTO } from './dto/booking.dto';
import { BookingModel } from './models/booking.model';

@Controller('booking')
export class BookingController {
	constructor(private readonly bookingService: BookingService) {}

	@Post('create')
	@HttpCode(201)
	public async createBooking(@Body() dto: IBookingModelDTO): Promise<BookingModel> {
		return this.bookingService.create(dto);
	}
	@Get('get/all')
	@HttpCode(200)
	public async getAllBooking(): Promise<BookingModel[]> {
		return this.bookingService.getAll();
	}
	@Get(':id')
	@HttpCode(200)
	public async getBookingById(@Param('id') id: string): Promise<BookingModel> {
		return this.bookingService.getById(id);
	}
	@Patch(':id')
	@HttpCode(200)
	public async updateBooking(
		@Param('id') id: string,
		@Body() dto: Partial<IBookingModelDTO>,
	): Promise<BookingModel> {
		return this.bookingService.update(id, dto);
	}
	@Patch(':id')
	@HttpCode(200)
	public async softDelete(@Param('id') id: string): Promise<BookingModel> {
		return this.bookingService.softDelete(id);
	}
	@Delete(':id')
	@HttpCode(204)
	public async delete(@Param('id') id: string): Promise<void> {
		await this.bookingService.delete(id);
	}
}
