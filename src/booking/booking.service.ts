import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingModel, BookingDocument } from './models/booking.model';
import { Model } from 'mongoose';
import { BookingStatus, IBookingModelDTO } from './dto/booking.dto';
import { RoomModel } from '../room/models/room.model';
import {
	BOOKING_NOT_FOUND,
	BOOKING_NOT_FOUND_OR_NOT_STATUS_REJECTED,
	ROOM_BOOKING,
	ROOM_NOT_FOUND,
} from '../messages/error.messages';

@Injectable()
export class BookingService {
	constructor(
		@InjectModel(BookingModel.name) private bookingModel: Model<BookingDocument>,
		@InjectModel(RoomModel.name) private roomModel: Model<RoomModel>,
	) {}
	public async create(dto: IBookingModelDTO): Promise<BookingModel> {
		const room = await this.roomModel.findById(dto.room_id);
		if (!room) {
			throw new NotFoundException(ROOM_NOT_FOUND);
		}
		const existingBooking = await this.bookingModel.findOne({
			room_id: dto.room_id,
			bookingDate: dto.bookingDate,
		});
		if (existingBooking) {
			throw new BadRequestException(ROOM_BOOKING);
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
			throw new NotFoundException(BOOKING_NOT_FOUND);
		}
		return booking;
	}
	public async update(id: string, dto: Partial<IBookingModelDTO>): Promise<BookingModel> {
		const existingBooking = await this.bookingModel.findById(id).exec();
		if (!existingBooking) {
			throw new NotFoundException(BOOKING_NOT_FOUND);
		}
		return this.bookingModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
	public async delete(id: string, status: BookingStatus): Promise<void> {
		const result = await this.bookingModel.deleteOne({ _id: id, status: status }).exec();
		if (result.deletedCount === 0) {
			throw new BadRequestException(BOOKING_NOT_FOUND_OR_NOT_STATUS_REJECTED);
		}
	}
}
