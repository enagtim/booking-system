import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomDocument, RoomModel } from './models/room.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomModelDto } from './dto/room.dto';
import { ROOM_NOT_FOUND } from '../messages/error.messages';

@Injectable()
export class RoomService {
	constructor(@InjectModel(RoomModel.name) private roomModel: Model<RoomDocument>) {}
	public async create(dto: RoomModelDto): Promise<RoomModel> {
		const newRoom = new this.roomModel(dto);
		return await newRoom.save();
	}
	public async getById(id: string): Promise<RoomModel> {
		const room = await this.roomModel.findById(id).exec();
		if (!room) {
			throw new NotFoundException(ROOM_NOT_FOUND);
		}
		return room;
	}
	public async getAll(): Promise<RoomModel[]> {
		const rooms = await this.roomModel.find().exec();
		return rooms;
	}
	public async update(id: string, dto: Partial<RoomModelDto>): Promise<RoomModel> {
		const room = await this.roomModel.findById(id).exec();
		if (!room) {
			throw new NotFoundException(ROOM_NOT_FOUND);
		}
		return this.roomModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
	public async delete(id: string): Promise<void> {
		const result = await this.roomModel.deleteOne({ _id: id }).exec();
		if (result.deletedCount === 0) {
			throw new NotFoundException(ROOM_NOT_FOUND);
		}
	}
}
