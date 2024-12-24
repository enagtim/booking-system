import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomDocument, RoomModel } from './models/room.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IRoomModelDto } from './dto/room.dto';

@Injectable()
export class RoomService {
	constructor(@InjectModel(RoomModel.name) private roomModel: Model<RoomDocument>) {}
	public async create(roomDto: IRoomModelDto): Promise<RoomModel> {
		const newRoom = new this.roomModel(roomDto);
		return newRoom.save();
	}
	public async getById(id: string): Promise<RoomModel> {
		const room = await this.roomModel.findById(id).exec();
		if (!room) {
			throw new NotFoundException(`Room with ID ${id} not found`);
		}
		return room;
	}
	public async getAll(): Promise<RoomModel[]> {
		const rooms = await this.roomModel.find().exec();
		return rooms;
	}
	public async update(id: string, roomDto: Partial<IRoomModelDto>): Promise<RoomModel> {
		const room = await this.roomModel.findById(id).exec();
		if (!room) {
			throw new NotFoundException(`Room with ID ${id} not found`);
		}
		return this.roomModel.findByIdAndUpdate(id, roomDto, { new: true }).exec();
	}
	public async delete(id: string): Promise<void> {
		const result = await this.roomModel.deleteOne({ _id: id }).exec();
		if (result.deletedCount === 0) {
			throw new NotFoundException(`Room with ID ${id} not found`);
		}
	}
}
