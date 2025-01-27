import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomModelDto } from './dto/room.dto';
import { RoomModel } from './models/room.model';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	@HttpCode(201)
	public async createRoom(@Body() dto: RoomModelDto): Promise<RoomModel> {
		return this.roomService.create(dto);
	}
	@Get('all')
	@HttpCode(200)
	public async getAllRoom(): Promise<RoomModel[]> {
		return this.roomService.getAll();
	}
	@Get('get/:id')
	@HttpCode(200)
	public async getRoomById(@Query('id') id: string): Promise<RoomModel> {
		return this.roomService.getById(id);
	}
	@Patch('update/:id')
	@HttpCode(200)
	public async updateRoom(
		@Query('id') id: string,
		@Body() dto: Partial<RoomModelDto>,
	): Promise<RoomModel> {
		return this.roomService.update(id, dto);
	}
	@HttpCode(204)
	@Delete('delete/:id')
	public async deleteRoom(@Query('id') id: string): Promise<void> {
		await this.roomService.delete(id);
	}
}
