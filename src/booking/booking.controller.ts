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
	UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingModelDTO } from './dto/booking.dto';
import { BookingModel } from './models/booking.model';
import { BookingStatus } from '../enum/booking.status.enum';
import { Roles } from '../auth/decorators/role.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enum/role.enum';

@Controller('booking')
export class BookingController {
	constructor(private readonly bookingService: BookingService) {}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.USER)
	@UsePipes(new ValidationPipe())
	@Post('create')
	@HttpCode(201)
	public async createBooking(@Body() dto: BookingModelDTO): Promise<BookingModel> {
		return this.bookingService.create(dto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Get('all')
	@HttpCode(200)
	public async getAllBooking(): Promise<BookingModel[]> {
		return this.bookingService.getAll();
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.USER)
	@Get('get/:id')
	@HttpCode(200)
	public async getBookingById(@Query('id') id: string): Promise<BookingModel> {
		return this.bookingService.getById(id);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.USER)
	@Patch('update/:id')
	@HttpCode(200)
	public async updateBooking(
		@Query('id') id: string,
		@Body() dto: Partial<BookingModelDTO>,
	): Promise<BookingModel> {
		return this.bookingService.update(id, dto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Delete('delete/:id')
	@HttpCode(204)
	public async delete(
		@Query('id') id: string,
		@Query('status') status: BookingStatus.REJECTED,
	): Promise<void> {
		await this.bookingService.delete(id, status);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Get('stats')
	public async getBookingStats(@Query('year') year: string, @Query('month') month: string) {
		const stats = await this.bookingService.getMonthlyBookingStats(parseInt(year), parseInt(month));
		return {
			month,
			year,
			data: stats,
		};
	}
}
