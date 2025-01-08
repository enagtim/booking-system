import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { IRoomModelDto } from './dto/room.dto';
import { RoomModel } from './models/room.model';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@Post('create')
	@HttpCode(201)
	public async createRoom(@Body() dto: IRoomModelDto): Promise<RoomModel> {
		return this.roomService.create(dto);
	}
	@Get('get/all')
	@HttpCode(200)
	public async getAllRoom(): Promise<RoomModel[]> {
		return this.roomService.getAll();
	}
	@Get(':id')
	@HttpCode(200)
	public async getRoomById(@Param('id') id: string): Promise<RoomModel> {
		return this.roomService.getById(id);
	}
	@Patch(':id')
	@HttpCode(200)
	public async updateRoom(
		@Param('id') id: string,
		@Body() dto: Partial<IRoomModelDto>,
	): Promise<RoomModel> {
		return this.roomService.update(id, dto);
	}
	@HttpCode(204)
	@Delete(':id')
	public async deleteRoom(@Param('id') id: string): Promise<void> {
		await this.roomService.delete(id);
	}
}
