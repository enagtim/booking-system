import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomModelDto } from './dto/room.dto';
import { RoomModel } from './models/room.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorators';
import { Role } from '../enum/role.enum';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Post('create')
	@HttpCode(201)
	public async createRoom(@Body() dto: RoomModelDto): Promise<RoomModel> {
		return this.roomService.create(dto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Get('all')
	@HttpCode(200)
	public async getAllRoom(): Promise<RoomModel[]> {
		return this.roomService.getAll();
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Get('get/:id')
	@HttpCode(200)
	public async getRoomById(@Query('id') id: string): Promise<RoomModel> {
		return this.roomService.getById(id);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Patch('update/:id')
	@HttpCode(200)
	public async updateRoom(
		@Query('id') id: string,
		@Body() dto: Partial<RoomModelDto>,
	): Promise<RoomModel> {
		return this.roomService.update(id, dto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@HttpCode(204)
	@Delete('delete/:id')
	public async deleteRoom(@Query('id') id: string): Promise<void> {
		await this.roomService.delete(id);
	}
}
