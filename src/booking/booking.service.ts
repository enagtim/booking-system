import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingModel, BookingDocument } from './models/booking.model';
import { Model } from 'mongoose';
import { IBookingModelDTO } from './dto/booking.dto';
import { RoomModel } from 'src/room/models/room.model';

@Injectable()
export class BookingService {
	constructor(
		@InjectModel(BookingModel.name) private scheduleModel: Model<BookingDocument>,
		@InjectModel(RoomModel.name) private roomModel: Model<RoomModel>,
	) {}
	public async create(createScheduleDto: IBookingModelDTO): Promise<BookingModel> {
		const room = await this.roomModel.findById(createScheduleDto.room_id);
		if (!room) {
			throw new NotFoundException(`Room with ID ${createScheduleDto.room_id} not found`);
		}
		const existingBooking = await this.scheduleModel.findOne({
			room_id: createScheduleDto.room_id,
			bookingDate: createScheduleDto.bookingDate,
		});
		if (existingBooking) {
			throw new BadRequestException(`Room is already booked on ${createScheduleDto.bookingDate}`);
		}
		const newSchedule = new this.scheduleModel(createScheduleDto);
		return newSchedule.save();
	}
	public async getAll(): Promise<BookingModel[]> {
		return this.scheduleModel.find().exec();
	}
	public async getById(id: string): Promise<BookingModel> {
		const schedule = await this.scheduleModel.findById(id).exec();
		if (!schedule) {
			throw new NotFoundException(`Schedule with ID ${id} not found`);
		}
		return schedule;
	}
	public async update(
		id: string,
		updatedScheduleDto: Partial<IBookingModelDTO>,
	): Promise<BookingModel> {
		const existingSchedule = await this.scheduleModel.findById(id).exec();
		if (!existingSchedule) {
			throw new NotFoundException(`Schedule with ID ${id} not found`);
		}
		return this.scheduleModel.findByIdAndUpdate(id, updatedScheduleDto, { new: true }).exec();
	}
	public async softDelete(id: string): Promise<BookingModel> {
		const schedule = await this.scheduleModel.findById(id).exec();
		if (!schedule) {
			throw new NotFoundException(`Schedule with ID ${id} not found`);
		}
		schedule.deletedAt = new Date();
		return schedule;
	}
	public async delete(id: string): Promise<void> {
		const result = await this.scheduleModel.deleteOne({ _id: id }).exec();
		if (result.deletedCount === 0) {
			throw new NotFoundException(`Schedule with ID ${id} not found`);
		}
	}
}
