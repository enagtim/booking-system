import { ERROR_MESSAGES } from '../messages/error.messages';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingModel, BookingDocument } from './models/booking.model';
import { Model } from 'mongoose';
import { BookingModelDTO } from './dto/booking.dto';
import { RoomModel } from '../room/models/room.model';
import { BookingStatus } from '..//enum/booking.status.enum';

@Injectable()
export class BookingService {
	constructor(
		@InjectModel(BookingModel.name) private bookingModel: Model<BookingDocument>,
		@InjectModel(RoomModel.name) private roomModel: Model<RoomModel>,
	) {}
	public async create(dto: BookingModelDTO): Promise<BookingModel> {
		const room = await this.roomModel.findById(dto.room_id);
		if (!room) {
			throw new NotFoundException(ERROR_MESSAGES.ROOM_NOT_FOUND);
		}
		const existingBooking = await this.bookingModel.findOne({
			room_id: dto.room_id,
			bookingStartDate: dto.bookingStartDate,
			bookingEndDate: dto.bookingEndDate,
		});
		if (existingBooking) {
			throw new BadRequestException(ERROR_MESSAGES.ROOM_BOOKING);
		}
		const newBooking = new this.bookingModel(dto);
		return newBooking.save();
	}
	public async getAll(): Promise<BookingModel[]> {
		return this.bookingModel.find().exec();
	}
	public async getById(id: string): Promise<BookingModel> {
		const booking = await this.bookingModel.findById(id).exec();
		if (!booking) {
			throw new NotFoundException(ERROR_MESSAGES.BOOKING_NOT_FOUND);
		}
		return booking;
	}
	public async update(id: string, dto: Partial<BookingModelDTO>): Promise<BookingModel> {
		const existingBooking = await this.bookingModel.findById(id).exec();
		if (!existingBooking) {
			throw new NotFoundException(ERROR_MESSAGES.BOOKING_NOT_FOUND);
		}
		return this.bookingModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
	public async delete(id: string, status: BookingStatus): Promise<void> {
		const result = await this.bookingModel.deleteOne({ _id: id, status: status }).exec();
		if (result.deletedCount === 0) {
			throw new BadRequestException(ERROR_MESSAGES.BOOKING_NOT_FOUND_OR_NOT_STATUS_REJECTED);
		}
	}
	public async getMonthlyBookingStats(year: number, month: number) {
		const startDate = new Date(year, month - 1, 1);
		const endDate = new Date(year, month, 0);

		const result = await this.bookingModel.aggregate([
			{
				$match: {
					bookingStartDate: { $lte: endDate },
					bookingEndDate: { $gte: startDate },
				},
			},
			{
				$project: {
					room_id: 1,
					daysBooked: {
						$subtract: [
							{ $min: [endDate, '$bookingEndDate'] },
							{ $max: [startDate, '$bookingStartDate'] },
						],
					},
				},
			},
			{
				$group: {
					_id: '$room_id',
					totalDaysBooked: { $sum: { $divide: ['$daysBooked', 1000 * 60 * 60 * 24] } },
				},
			},
			{
				$sort: { totalDaysBooked: -1 },
			},
		]);
		return result.map((item) => ({
			roomId: item._id,
			daysBooked: Math.ceil(item.totalDaysBooked),
		}));
	}
}
